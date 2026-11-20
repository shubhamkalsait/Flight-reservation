# Flight Reservation System

A full-stack flight reservation and check-in system built with Spring Boot microservices and React (Vite).

---

## Architecture & Directory Structure

The repository is structured into three clean application modules:

```
├── flightreservationapp/   # Spring Boot backend (Flight booking, user auth, search, PDF generation)
├── flightcheckinapp/       # Spring Boot microservice (Check-in management)
├── frontend/               # React + Vite + Redux frontend web application
├── sql.txt                 # Database schema and initial flight seed data
└── Readme.md               # Application setup and run guide
```

---

## Prerequisites

- **Java**: OpenJDK 17 or later
- **Maven**: 3.8+ (or use the included `./mvnw`)
- **Node.js**: 18+ & **npm**
- **MySQL**: 8.0+

---

## Database Setup

1. Start your local MySQL server and create the required databases:
   ```sql
   CREATE DATABASE flightdb;
   CREATE DATABASE checkin_db;
   ```

2. Run the SQL initialization script for `flightdb` (schema and flight records):
   ```shell
   mysql -u root -p flightdb < sql.txt
   ```

---

## Running the Applications

### 1. Flight Reservation Backend (`flightreservationapp`)

Port: `8080`

```shell
cd flightreservationapp

# Run using Maven wrapper
./mvnw clean spring-boot:run
```

*Note: Default administrator account created on startup: `admin` / `admin123`.*

---

### 2. Flight Check-In Backend (`flightcheckinapp`)

Port: `8081`

```shell
cd flightcheckinapp

# Run using Maven wrapper
./mvnw clean spring-boot:run
```

*Note: The check-in service connects to the booking service on port 8080 to validate reservations.*

---

### 3. Frontend Application (`frontend`)

Port: `5173` (Vite dev server)

```shell
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

To build for production:
```shell
npm run build
```
The compiled static assets will be output to `frontend/dist/`.
