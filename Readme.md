# Flight Reservation System

A full-stack flight reservation and check-in system built with Spring Boot microservices and React (Vite).

---

## Architecture & Directory Structure

The repository is structured into three clean application modules:

```
├── flightReservation/              # Spring Boot backend (Flight booking, user auth, search, PDF generation)
├── flightCheckIn/                  # Spring Boot microservice (Check-in management)
├── flightTicketingSystem-frontend/ # React + Vite + Redux frontend web application
└── Readme.md                       # Application setup and run guide
```

---

## Environment & Prerequisites

- **Java**: OpenJDK 17 (e.g. `17.0.21.1` or later)
- **Maven**: Apache Maven 3.9+ (or use the included `./mvnw`)
- **Node.js**: 18+ & **npm**
- **MySQL**: 8.0+

---

## Database Setup

1. Start your local MySQL server and create the required databases:
   ```sql
   CREATE DATABASE flightdb;
   CREATE DATABASE checkin_db;
   ```

2. Tables and admin users (`admin` / `admin123`) are automatically initialized by Hibernate on application startup.

---

## Running the Applications

### 1. Flight Reservation Backend (`flightReservation`)

Port: `8080`

```shell
cd flightReservation

# Build and package
mvn clean package

# Run with environment variables (or rely on defaults)
export DATASOURCE_URL="jdbc:mysql://localhost:3306/flightdb?createDatabaseIfNotExist=true"
export DATASOURCE_USER="root"
export DATASOURCE_PASSWORD="password"

java -jar target/flightreservationApplication-0.0.1-SNAPSHOT.jar
```

*Note: Default administrator account created on startup: `admin` / `admin123`.*

---

### 2. Flight Check-In Backend (`flightCheckIn`)

Port: `8081`

```shell
cd flightCheckIn

# Build and package
mvn clean package

# Run with environment variables (or rely on defaults)
export DATASOURCE_URL="jdbc:mysql://localhost:3306/checkin_db?createDatabaseIfNotExist=true"
export DATASOURCE_USER="root"
export DATASOURCE_PASSWORD="password"
export BOOKING_SERVICE_URL="http://localhost:8080/api/bookings"

java -jar target/flightCkeckinApplication-0.0.1-SNAPSHOT.jar
```

*Note: The check-in service connects to the booking service on port 8080 to validate reservations.*

---

### 3. Frontend Application (`flightTicketingSystem-frontend`)

Port: `5173` (Vite dev server)

```shell
cd flightTicketingSystem-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

To build for production:
```shell
npm run build
```
The compiled static assets will be output to `flightTicketingSystem-frontend/dist/`.
