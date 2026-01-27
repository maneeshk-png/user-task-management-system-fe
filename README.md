# User Task Management System - Frontend

A simple Angular SPA for managing users and tasks. This frontend app is fully containerized with Docker and designed to work with microservices-based backend architecture in the future.

---

## 🚀 Features

- User Authentication (Login/Logout)
- Dashboard summary with task statistics
- Task CRUD (Create, Read, Update, Delete)
- Reactive forms with validation
- Protected routes using AuthGuard
- Loading, error, and empty states handled
- Dockerized for development and production

---


## 🐳 Development with Docker

### 1. Clone Repository


git clone https://github.com/<username>/user-management-system-frontend.git
cd user-management-system-frontend

### 2. Build Docker Image
bash
Copy code
docker build -t user-task-frontend .


### 3. Run Container with Live Reload
bash
Copy code
docker run -it -p 4200:4200 -v ${PWD}:/app user-task-frontend
Access the app at http://localhost:4200

Any changes to source code automatically reload the app thanks to the volume mount

📁 Project Structure (Frontend Microservice)

src/
└── app/
    ├── core/                # Singleton services, guards, models
    ├── features/            # Feature modules: auth, dashboard, tasks
    ├── shared/              # Reusable UI components (navbar)
    ├── app-routing.module.ts
    ├── app.component.ts
    └── app.module.ts




Command	Description

ng serve	Run Angular dev server inside container (already in CMD)
ng build	Build production-ready code
ng test	Run unit tests (inside container)
ng e2e	Run end-to-end tests (inside container)
---



