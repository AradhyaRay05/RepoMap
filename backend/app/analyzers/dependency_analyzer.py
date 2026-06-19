import os
import re
from pathlib import Path
from typing import Dict, List, Set
import networkx as nx


class DependencyAnalyzer:
    IMPORT_PATTERNS = {
        "python": [
            r"^from\s+([\w.]+)\s+import",
            r"^import\s+([\w.]+)",
        ],
        "javascript": [
            r'^import\s+.*?from\s+["\']([^"\']+)["\']',
            r'^import\s+["\']([^"\']+)["\']',
            r'^require\s*\(\s*["\']([^"\']+)["\']',
        ],
        "typescript": [
            r'^import\s+.*?from\s+["\']([^"\']+)["\']',
            r'^import\s+["\']([^"\']+)["\']',
            r'^require\s*\(\s*["\']([^"\']+)["\']',
        ],
        "java": [
            r'^import\s+([\w.]+)',
        ],
        "go": [
            r'^import\s+"([^"]+)"',
            r'^import\s+\w+\s+"([^"]+)"',
        ],
    }

    LANG_EXTENSIONS = {
        ".py": "python",
        ".js": "javascript",
        ".jsx": "javascript",
        ".ts": "typescript",
        ".tsx": "typescript",
        ".java": "java",
        ".go": "go",
    }

    IGNORE_DIRS = {
        ".git", "node_modules", "__pycache__", ".venv", "venv",
        "env", "dist", "build", ".next", "vendor",
    }

    def analyze(self, repo_path: str) -> Dict:
        graph = nx.DiGraph()
        file_modules = {}

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]

            for filename in files:
                filepath = os.path.join(root, filename)
                ext = Path(filename).suffix.lower()

                if ext in self.LANG_EXTENSIONS:
                    lang = self.LANG_EXTENSIONS[ext]
                    rel_path = os.path.relpath(filepath, repo_path).replace(os.sep, "/")
                    module_name = self._get_module_name(rel_path)
                    file_modules[rel_path] = module_name

                    imports = self._extract_imports(filepath, lang, repo_path)
                    for imp in imports:
                        graph.add_edge(module_name, imp)

        return {
            "nodes": list(graph.nodes()),
            "edges": [{"source": u, "target": v} for u, v in graph.edges()],
            "dependencies": self._get_dependency_dict(graph),
            "most_connected": self._get_most_connected(graph),
        }

    def _extract_imports(self, filepath: str, lang: str, repo_path: str) -> List[str]:
        imports = []
        patterns = self.IMPORT_PATTERNS.get(lang, [])

        try:
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    line = line.strip()
                    for pattern in patterns:
                        match = re.match(pattern, line)
                        if match:
                            import_path = match.group(1)
                            if not self._is_external_package(import_path, lang):
                                imports.append(import_path)
        except Exception:
            pass

        return imports

    def _is_external_package(self, import_path: str, lang: str) -> bool:
        if lang == "python":
            return "." not in import_path or import_path.startswith(("os", "sys", "json", "re", "logging"))
        if lang in ("javascript", "typescript"):
            return not import_path.startswith((".", "/"))
        return False

    def _get_module_name(self, filepath: str) -> str:
        parts = Path(filepath).parts
        if len(parts) > 1:
            return "/".join(parts[:-1])
        return Path(filepath).stem

    def _get_dependency_dict(self, graph: nx.DiGraph) -> Dict[str, List[str]]:
        deps = {}
        for node in graph.nodes():
            deps[node] = list(graph.successors(node))
        return deps

    def _get_most_connected(self, graph: nx.DiGraph, top_n: int = 10) -> List[Dict]:
        centrality = nx.degree_centrality(graph)
        sorted_nodes = sorted(centrality.items(), key=lambda x: x[1], reverse=True)

        return [
            {"module": node, "centrality": round(score, 3)}
            for node, score in sorted_nodes[:top_n]
        ]