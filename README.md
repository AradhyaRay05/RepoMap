# RepoMap — Repository Onboarding Assistant

RepoMap is a full-stack developer productivity platform that helps people understand unfamiliar GitHub repositories faster. Paste a public repository URL, run a static codebase analysis, and get a structured onboarding report with detected technologies, architecture patterns, dependency relationships, important files, and a suggested reading order.

## Short GitHub Description

AI-powered GitHub repository analyzer that maps code structure, detects tech stacks, visualizes dependencies, and generates developer onboarding guides in minutes.

## Who Is This For?

### For Users

RepoMap is built for developers, students, open-source contributors, and teams who need to understand a new codebase quickly.

With RepoMap, you can:

- Paste any public GitHub repository URL.
- Discover the project structure without manually browsing every folder.
- Identify frameworks, languages, databases, and DevOps tools.
- See important files and likely entry points.
- Follow a suggested reading order instead of guessing where to start.
- Generate a human-readable onboarding guide for faster ramp-up.

### For Developers

RepoMap is designed as a modular full-stack application with a React frontend, Flask backend, MySQL persistence layer, and a static analysis engine.

Developer-focused highlights:

- Clean separation between UI, API, services, analyzers, models, and database layers.
- Extensible analyzer architecture for structure analysis, technology detection, language detection, dependency mapping, entry point detection, architecture discovery, and file ranking.
- REST API endpoints for starting analysis jobs, checking status, and retrieving reports.
- React Flow and Recharts for visual dependency and report data presentation.
- Docker Compose setup for running frontend, backend, and MySQL together.
- Static analysis only: repository code is inspected, not executed.

### For Recruiters and Reviewers

This project demonstrates practical full-stack engineering skills through a real developer-facing product.

What it showcases:

- Modern frontend development with React, TypeScript, Vite, Tailwind CSS, routing, reusable components, authentication flows, and responsive UI.
- Backend API design with Flask, SQLAlchemy, service layers, validation, authentication routes, and structured error handling.
- Code analysis concepts including repository cloning, language detection, dependency graph generation, architecture pattern recognition, and file importance ranking.
- Database-backed application design using MySQL and SQLAlchemy models.
- Product thinking through onboarding-focused reports, demo views, SEO metadata, and polished landing pages.
- Deployment-minded structure with Dockerfiles and Docker Compose.

## Key Features

- **GitHub Repository Import** — Analyze any public GitHub repository URL.
- **Repository Structure Analysis** — Map folders, modules, and architectural layers.
- **Technology Detection** — Detect frontend frameworks, backend frameworks, databases, package managers, and DevOps tools.
- **Language Analysis** — Calculate language usage with file counts and percentages.
- **Entry Point Detection** — Identify likely starting files for frontend, backend, and configuration.
- **Dependency Graph Generation** — Build relationships between modules using imports and graph analysis.
- **Architecture Discovery** — Detect common patterns such as MVC, layered architecture, clean architecture, microservices, and modular monoliths.
- **Important File Ranking** — Score files by relevance, centrality, and project significance.
- **Suggested Reading Order** — Generate a practical roadmap for understanding the repository.
- **Onboarding Guide Generator** — Produce a readable guide for new developers joining the project.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- React Flow
- Recharts

### Backend

- Python 3.11+
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- Flask-Migrate
- PyJWT
- PyMySQL

### Analysis Engine

- GitPython for repository cloning
- PyGithub for GitHub metadata
- NetworkX for dependency graph analysis
- Custom analyzers for structure, technologies, languages, architecture, entry points, dependency mapping, and file ranking

### Database and Tooling

- MySQL 8.0
- Docker Compose
- SQLAlchemy ORM

## Project Structure

```text
repository-onboarding-assistant/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── analyzers/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── run.py
├── database/
│   └── schema.sql
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## How It Works

```text
1. User submits a public GitHub repository URL.
2. Backend validates the URL and clones the repository into a temporary workspace.
3. Static analyzers inspect files, folders, imports, package files, and configuration.
4. Analysis results are stored in MySQL.
5. The frontend displays technology summaries, architecture insights, dependency data, important files, and onboarding guidance.
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- MySQL 8.0+
- Git
- Docker and Docker Compose, optional but recommended

### Run with Docker Compose

From the project root:

```bash
docker-compose up -d
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MySQL: `localhost:3306`

### Manual Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
flask run
```

Update `backend/.env` with your local configuration. A GitHub token is optional for basic public repository analysis but recommended to avoid GitHub API rate limits.

Example values:

```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=mysql+pymysql://root:root@localhost:3306/repo_onboarding
GITHUB_TOKEN=your_github_token
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

### Manual Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend runs at `http://localhost:3000`.

### Database Setup

If you are not using Docker, create the MySQL database manually:

```sql
CREATE DATABASE IF NOT EXISTS repo_onboarding
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Or run the provided schema:

```bash
mysql -u root -p < database/schema.sql
```

## API Overview

### Start Analysis

```http
POST /api/analyze
```

```json
{
  "github_url": "https://github.com/user/repository"
}
```

### Check Analysis Status

```http
GET /api/analysis/:analysis_id
```

### Get Full Report

```http
GET /api/report/:analysis_id
```

### Get Onboarding Guide

```http
GET /api/report/:analysis_id/guide
```

## Testing

Backend tests live in `backend/tests`.

```bash
cd backend
pytest tests/ -v
```

Frontend production build:

```bash
cd frontend
npm run build
```

## Security Notes

- RepoMap analyzes public repositories only.
- Repository code is inspected statically and is not executed.
- Use environment variables for secrets and API keys.
- Do not commit `.env` files or credentials.

## Portfolio Summary

RepoMap is a portfolio-ready full-stack project focused on solving a real developer onboarding problem. It combines polished UI design, REST API development, database modeling, repository analysis, dependency graph generation, and practical product presentation into one cohesive application.

## License

MIT
