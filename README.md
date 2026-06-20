# RepoMap — Repository Onboarding Assistant

RepoMap is a full-stack developer productivity platform that helps people understand unfamiliar GitHub repositories faster. Paste a public repository URL, run a static codebase analysis, and get a structured onboarding report with detected technologies, architecture patterns, dependency relationships, important files, and a suggested reading order.


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

RepoMap is designed as a modular full-stack application with a React frontend, Flask backend, PostgreSQL persistence layer, and a static analysis engine.

Developer-focused highlights:

- Clean separation between UI, API, services, analyzers, models, and database layers.
- Extensible analyzer architecture for structure analysis, technology detection, language detection, dependency mapping, entry point detection, architecture discovery, and file ranking.
- REST API endpoints for starting analysis jobs, checking status, and retrieving reports.
- React Flow and Recharts for visual dependency and report data presentation.
- Docker Compose setup for running frontend, backend, and PostgreSQL together.
- Static analysis only: repository code is inspected, not executed.

### For Recruiters and Reviewers

This project demonstrates practical full-stack engineering skills through a real developer-facing product.

What it showcases:

- Modern frontend development with React, TypeScript, Vite, Tailwind CSS, routing, reusable components, authentication flows, and responsive UI.
- Backend API design with Flask, SQLAlchemy, service layers, validation, authentication routes, and structured error handling.
- Code analysis concepts including repository cloning, language detection, dependency graph generation, architecture pattern recognition, and file importance ranking.
- Database-backed application design using PostgreSQL and SQLAlchemy models.
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
- psycopg2-binary

### Analysis Engine

- GitPython for repository cloning
- PyGithub for GitHub metadata
- NetworkX for dependency graph analysis
- Custom analyzers for structure, technologies, languages, architecture, entry points, dependency mapping, and file ranking

### Database and Tooling

- PostgreSQL 16
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
4. Analysis results are stored in PostgreSQL.
5. The frontend displays technology summaries, architecture insights, dependency data, important files, and onboarding guidance.
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 16+
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
- PostgreSQL: `localhost:5432`

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
DATABASE_URL=postgresql://postgres:Aradhya%40123@localhost:5432/repomap
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

If you are not using Docker, create the PostgreSQL database manually:

```sql
CREATE DATABASE repomap;
```

Or run the provided schema:

```bash
psql "postgresql://postgres:Aradhya%40123@localhost:5432/repomap" -f database/schema.sql
```

## Deployment

### Render Backend and PostgreSQL

Create a Render PostgreSQL database, then deploy `backend/` as a Render web service using the backend `Dockerfile`.

Recommended Render PostgreSQL values:

```text
Name: repomap-db
Database: repomap
User: repomap
```

Set these backend environment variables in Render:

```env
FLASK_ENV=production
DATABASE_URL=your_render_postgresql_internal_database_url
SECRET_KEY=your_production_secret_key
JWT_SECRET_KEY=your_production_jwt_secret_key
GITHUB_TOKEN=your_github_token_optional
WEB_CONCURRENCY=2
```

The backend Dockerfile reads Render's `PORT` environment variable automatically.

### Vercel Frontend

Deploy `frontend/` to Vercel.

Set this frontend environment variable in Vercel:

```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

For local development, the frontend still falls back to `/api` and uses the Vite proxy in `frontend/vite.config.ts`.

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

## 📄 License

This project is licensed under the [MIT License](LICENSE).


## 📬 Contact

<p>
  <a href="mailto:aradhyaray05@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
  <a href="www.linkedin.com/in/rayaradhya"><img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://github.com/AradhyaRay05"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
</p>


Thanks for visiting ! Feel free to explore my other repositories and connect with me.
