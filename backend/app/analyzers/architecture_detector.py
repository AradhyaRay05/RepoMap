import os
from pathlib import Path
from typing import Dict, List, Optional


class ArchitectureDetector:
    PATTERNS = {
        "MVC": {
            "required": ["models", "views", "controllers"],
            "optional": ["routes", "middleware"],
            "description": "Model-View-Controller architecture",
        },
        "Layered Architecture": {
            "required": ["services", "repositories"],
            "optional": ["controllers", "models", "dto", "entities"],
            "description": "Traditional layered architecture with separation of concerns",
        },
        "Clean Architecture": {
            "required": ["domain", "application"],
            "optional": ["infrastructure", "interfaces", "adapters", "usecases"],
            "description": "Clean Architecture with dependency rule",
        },
        "Hexagonal Architecture": {
            "required": ["ports", "adapters"],
            "optional": ["domain", "application", "infrastructure"],
            "description": "Hexagonal/Ports and Adapters architecture",
        },
        "Microservices": {
            "required": ["services"],
            "optional": ["gateway", "api-gateway", "shared", "common", "proto"],
            "description": "Microservices architecture",
        },
        "Modular Monolith": {
            "required": ["modules"],
            "optional": ["shared", "common", "core"],
            "description": "Modular monolith with clear module boundaries",
        },
    }

    def detect(self, repo_path: str) -> Dict:
        directories = self._get_all_directories(repo_path)
        detected = []

        for pattern_name, pattern in self.PATTERNS.items():
            score = self._calculate_pattern_score(directories, pattern)
            if score > 0:
                detected.append({
                    "pattern": pattern_name,
                    "score": score,
                    "description": pattern["description"],
                })

        detected.sort(key=lambda x: x["score"], reverse=True)

        if detected:
            primary = detected[0]
            return {
                "architecture": primary["pattern"],
                "confidence": primary["score"],
                "description": primary["description"],
                "alternatives": detected[1:3] if len(detected) > 1 else [],
            }

        return {
            "architecture": "Unknown",
            "confidence": 0,
            "description": "Could not determine architecture pattern",
            "alternatives": [],
        }

    def _get_all_directories(self, repo_path: str) -> List[str]:
        dirs = []
        ignore = {".git", "node_modules", "__pycache__", ".venv", "venv", "dist", "build"}

        for root, subdirs, files in os.walk(repo_path):
            subdirs[:] = [d for d in subdirs if d not in ignore]

            rel_path = os.path.relpath(root, repo_path)
            if rel_path != ".":
                dir_name = os.path.basename(root)
                dirs.append(dir_name.lower())

        return list(set(dirs))

    def _calculate_pattern_score(self, directories: List[str], pattern: Dict) -> float:
        required = pattern["required"]
        optional = pattern.get("optional", [])

        required_matches = sum(1 for r in required if r in directories)
        if required_matches < len(required):
            return 0

        optional_matches = sum(1 for o in optional if o in directories)

        score = (required_matches / len(required)) * 0.7
        if optional:
            score += (optional_matches / len(optional)) * 0.3

        return round(score, 2)