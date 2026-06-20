-- Run this in PostgreSQL:
-- psql "$DATABASE_URL" -f database/schema.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    provider VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repositories (
    id SERIAL PRIMARY KEY,
    github_url VARCHAR(500) NOT NULL UNIQUE,
    owner VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    default_branch VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analyses (
    id SERIAL PRIMARY KEY,
    repository_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    analysis_id INTEGER NOT NULL,
    project_type VARCHAR(100),
    architecture VARCHAR(100),
    frontend_framework VARCHAR(100),
    backend_framework VARCHAR(100),
    database VARCHAR(100),
    devops_tools JSONB,
    languages JSONB,
    entry_points JSONB,
    important_files JSONB,
    reading_order JSONB,
    dependency_graph JSONB,
    directory_structure JSONB,
    onboarding_guide TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (analysis_id) REFERENCES analyses(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_repositories_updated_at ON repositories;
CREATE TRIGGER set_repositories_updated_at
BEFORE UPDATE ON repositories
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_repositories_github_url ON repositories(github_url);
CREATE INDEX IF NOT EXISTS idx_analyses_repository_id ON analyses(repository_id);
CREATE INDEX IF NOT EXISTS idx_analyses_status ON analyses(status);
CREATE INDEX IF NOT EXISTS idx_reports_analysis_id ON reports(analysis_id);
