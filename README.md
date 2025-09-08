# Choose Your Own Adventure Story Generator

An AI-powered web application that creates immersive, interactive choose-your-own-adventure stories based on user-specified themes.

## 🚀 Tech Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern, fast Python web framework for building APIs
- **[SQLAlchemy](https://sqlalchemy.org/)** - Python SQL toolkit and Object-Relational Mapping (ORM)
- **[SQLite](https://sqlite.org/)** - Lightweight, serverless database engine
- **[LangChain](https://langchain.com/)** - Framework for developing applications with language models

### Frontend
- **[React 19](https://react.dev/)** - Modern JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[React Router](https://reactrouter.com/)** - Declarative routing for React applications
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for API communication

## ✨ Features

- **AI Story Generation** - Creates rich, immersive stories with 5-7+ meaningful choices
- **Custom Themes** - Users can specify any theme (fantasy, sci-fi, mystery, etc.)
- **Interactive Navigation** - Full story tree exploration with back/restart functionality
- **Real-time Generation** - Background job processing with live status updates
- **Session Management** - Cookie-based user sessions for story tracking
- **Win/Lose Endings** - Multiple story outcomes with victory and defeat scenarios

## 🏗️ Architecture

### Backend Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FastAPI App   │    │  Background     │    │   OpenAI API    │
│   (REST API)    │────│  Job Queue      │────│   (GPT-4o-mini) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   SQLAlchemy    │    │   Story Parser  │
│   (ORM Layer)   │    │   (Pydantic)    │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   SQLite DB     │
│   (Stories &    │
│    Job Status)  │
└─────────────────┘
```

### Database Schema
- **Stories Table** - Story metadata (title, session_id, created_at)
- **Story Nodes Table** - Individual story segments with choices and content
- **Story Jobs Table** - Background job tracking for async story generation

### Frontend Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   API Service   │    │   Backend API   │
│   (Components)  │────│   (Axios)       │────│   (FastAPI)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   React Router  │
│   (Navigation)  │
└─────────────────┘
```
