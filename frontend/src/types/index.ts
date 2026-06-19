export interface Repository {
  id: number;
  github_url: string;
  owner: string;
  name: string;
  description: string | null;
  default_branch: string | null;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: number;
  repository_id: number;
  status: "pending" | "cloning" | "analyzing" | "completed" | "failed";
  progress: number;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
}

export interface Language {
  language: string;
  files: number;
  percentage: number;
}

export interface ImportantFile {
  file: string;
  score: number;
}

export interface DependencyEdge {
  source: string;
  target: string;
}

export interface DependencyNode {
  id: string;
  label: string;
}

export interface DirectoryEntry {
  type: "file" | "directory";
  children_count?: number;
  size?: number;
}

export interface EntryPointCategory {
  frontend: string[];
  backend: string[];
  config: string[];
}

export interface TechStack {
  project_type: string;
  frontend: string | null;
  backend: string | null;
  database: string | null;
  devops: string[];
}

export interface Report {
  id: number;
  analysis_id: number;
  project_type: string;
  architecture: string;
  frontend: string | null;
  backend: string | null;
  database: string | null;
  devops: string[];
  languages: Language[];
  entry_points: EntryPointCategory;
  important_files: ImportantFile[];
  reading_order: string[];
  dependency_graph: {
    nodes: string[];
    edges: DependencyEdge[];
    dependencies: Record<string, string[]>;
    most_connected: { module: string; centrality: number }[];
  };
  directory_structure: {
    tree: Record<string, DirectoryEntry>;
    modules: string[];
    layers: { path: string; type: string }[];
    root_directories: string[];
  };
  onboarding_guide: string;
  created_at: string;
}