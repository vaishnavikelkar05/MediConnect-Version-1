# MediConnect 🏥

A production-ready full-stack healthcare web application for Kolhapur, Maharashtra.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Java Spring Boot 3.2 |
| Database | MySQL 8 |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Features

- **Hospital Finder** — Browse 15+ hospitals in Kolhapur with contact details and Google Maps links
- **Doctor Directory** — Filter doctors by hospital, specialization, and availability
- **Blood Bank** — Real-time blood group availability across hospitals
- **AI Specialist Finder** — Keyword-based symptom analysis recommending the right specialist

---

## Project Structure

```
mediconnect/
├── mediconnect-backend/          # Spring Boot backend
│   ├── src/main/java/com/mediconnect/
│   │   ├── controller/           # REST controllers
│   │   ├── service/              # Business logic
│   │   ├── repository/           # JPA repositories
│   │   ├── entity/               # JPA entities
│   │   └── dto/                  # Data transfer objects
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql              # Kolhapur seed data
└── mediconnect-frontend/         # React frontend
    └── src/
        ├── pages/                # Home, Hospitals, Doctors, BloodBank, Recommend
        ├── components/           # Navbar, Footer, LoadingSpinner, ErrorMessage
        ├── services/             # Axios API service
        └── config/               # API URL config
```

---

## Local Setup

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8

### Step 1: Database Setup

Open MySQL and run:

```sql
CREATE DATABASE mediconnect;
USE mediconnect;
```

Then run the full script from `mediconnect-backend/src/main/resources/data.sql`

### Step 2: Backend

Edit `mediconnect-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mediconnect?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Run the backend:

```bash
cd mediconnect-backend
# Windows
mvnw.cmd spring-boot:run

# Or with Maven installed
mvn spring-boot:run
```

Backend starts at: `http://localhost:8080`

### Step 3: Test APIs

```
GET  http://localhost:8080/api/test
GET  http://localhost:8080/api/hospitals
GET  http://localhost:8080/api/doctors
GET  http://localhost:8080/api/doctors?hospitalId=1
GET  http://localhost:8080/api/blood
GET  http://localhost:8080/api/blood?group=O+
POST http://localhost:8080/api/recommend-specialist
     Body: { "symptom": "chest pain and shortness of breath" }
```

### Step 4: Frontend

```bash
cd mediconnect-frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Set:
   - Build Command: `./mvnw clean install -DskipTests`
   - Start Command: `java -jar target/app.jar`
4. Add environment variables:
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://your-cloud-db:3306/mediconnect
   SPRING_DATASOURCE_USERNAME=root
   SPRING_DATASOURCE_PASSWORD=your_password
   ```

### Frontend → Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `mediconnect-frontend`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com/api
   ```

### Cloud MySQL Options
- [PlanetScale](https://planetscale.com) (free tier)
- [Railway](https://railway.app) (free tier)
- [Aiven](https://aiven.io) (free tier)

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/test` | Health check |
| GET | `/api/hospitals` | All hospitals |
| GET | `/api/hospitals?search=aster` | Search hospitals |
| GET | `/api/hospitals/{id}` | Hospital by ID |
| GET | `/api/doctors` | All doctors |
| GET | `/api/doctors?hospitalId=1` | Doctors by hospital |
| GET | `/api/doctors?specialization=Cardiologist` | Doctors by specialization |
| GET | `/api/blood` | All blood data |
| GET | `/api/blood?group=O+` | Blood by group |
| GET | `/api/blood?hospitalId=1` | Blood by hospital |
| POST | `/api/recommend-specialist` | Recommend specialist from symptoms |

---

## Kolhapur Data

Includes 15 real hospitals:
- Aster Aadhar Hospital
- CPR Hospital Kolhapur
- D Y Patil Hospital Kolhapur
- Shri Chhatrapati Shivaji Maharaj General Hospital
- Sahyadri Hospital Kolhapur
- Wanless Hospital Miraj
- And 9 more...

20+ doctors across 14 specializations, blood bank data for 8 blood groups.

---

## Emergency

For medical emergencies in Kolhapur: **Call 108**
