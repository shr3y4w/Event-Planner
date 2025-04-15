# 🎟️ Event Management System

An online platform for users to register, explore, and book events, while event planners can create, manage, and track their own events. Built using Django REST Framework and React with features like JWT authentication, QR-based tickets, and real-time seat availability.

---

## 🚀 Features

- User and Event Planner roles
- JWT-based authentication
- Event creation, update, deletion (planner-only)
- Event listing and booking (users)
- QR code generation on booking
- Seat availability update on successful booking
- Role-based access control on backend and frontend

---

## 🧠 Key Decisions

- **Django + DRF** for robust, scalable backend API development
- **PostgreSQL** for structured relational data (events, users, bookings)
- **React + Bootstrap** for fast, responsive frontend
- **JWT (SimpleJWT)** for stateless, secure authentication
- **Role stored in JWT** to enforce access rules both in frontend and backend
- **QR code generation** used as simulated e-tickets
- **Manual test scripts** (Python + `requests`) used for API behavior validation

---

## 📦 Tech Stack

| Layer              | Technology                    |
|--------------------|-------------------------------|
| **Frontend**       | React, Bootstrap              |
| **Backend**        | Django, Django REST Framework |
| **Database**       | PostgreSQL                    |
| **Authentication** | JWT (SimpleJWT)               |
| **Infrastructure** | Localhost, GitHub             |

---

## 📘 API Contracts

**Base URL:** `http://localhost:8000/api/`

| Endpoint                     | Method | Description                        | Access                |
|-----------------------------|--------|------------------------------------|------------------------|
| `/users/register/`          | POST   | Register user                      | Public                 |
| `/users/login/`             | POST   | Login and get JWT token            | Public                 |
| `/events/`                  | GET    | List all events                    | Authenticated          |
| `/events/`                  | POST   | Create event                       | Event Planners only    |
| `/events/{id}/`             | PATCH  | Update event                       | Owner Planner only     |
| `/events/{id}/`             | DELETE | Delete event                       | Owner Planner only     |
| `/events/book/{id}/`        | POST   | Book event                         | Users only             |
| `/events/my-events/`        | GET    | List planner's own events          | Event Planners only    |

> Note: Include `Authorization: Bearer <access_token>` in headers for protected routes.

---

## 🛠️ Local Setup Instructions

### 🔧 Backend

```bash
# 1. Clone the repo
git clone https://github.com/your-repo/event-management.git
cd event-management/backend

# 2. Set up virtual environment
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up PostgreSQL database and update settings.py

# 5. Run migrations
python manage.py migrate

# 6. Start the server
python manage.py runserver
