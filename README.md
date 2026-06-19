# Repository Onboarding Assistant

A full-stack application that accepts a GitHub repository URL, performs deep static codebase analysis, detects technologies and architecture, builds dependency relationships, ranks important files, and generates a complete developer onboarding guide.

## Features

- **GitHub Repository Import** - Accept any public GitHub repository URL
- **Repository Structure Analysis** - Directory hierarchy, module boundaries, layer detection
- **Technology Detection** - Frontend frameworks, backend frameworks, databases, DevOps tools
- **Language Analysis** - File counts and percentages per language
- **Entry Point Detection** - Find application starting files
- **Dependency Graph Generation** - Module dependency relationships
- **Architecture Discovery** - MVC, Layered, Clean, Hexagonal, Microservices patterns
- **Important File Ranking** - Score files by importance
- **Suggested Reading Order** - Onboarding roadmap for new developers
- **Onboarding Guide Generator** - Human-readable report

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Flow (dependency visualization)
- Recharts (charts)

### Backend
- Python 3.11+
- Flask
- SQLAlchemy
- PyMySQL

### Analysis Engine
- NetworkX (dependency graphs)
- GitPython (repository cloning)
- PyGithub (GitHub API)

### Database
- MySQL 8.0

## Project Structure

```
repository-onboarding-assistant/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── analyzers/
│   │   └── utils/
│   ├── tests/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── database/
│   └── schema.sql
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- MySQL 8.0+
- Git

### Database Setup

```sql
-- Connect to MySQL and run:
CREATE DATABASE IF NOT EXISTS repo_onboarding CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your MySQL credentials
flask run
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Docker Setup

```bash
docker-compose up -d
```

## API Endpoints

### POST /api/analyze

Start repository analysis.

```json
{
  "github_url": "https://github.com/user/repo"
}
```

### GET /api/report/{analysis_id}

Get analysis report.

## Configuration

Create `backend/.env`:

```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=mysql+pymysql://root:root@localhost:3306/repo_onboarding
GITHUB_TOKEN=your_github_token
SECRET_KEY=your_secret_key
```

## Testing

```bash
cd backend
pytest tests/ -v --cov=app
```

## License

MIT