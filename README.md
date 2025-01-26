# Constituent Management System

This application is designed to help manage constituents for elected officials. It provides features such as creating, viewing, sorting, deleting, and exporting constituent data, as well as managing messages associated with constituents. The app uses a PostgreSQL database for data storage and a TypeScript/Express backend, with a React-based frontend.

---

## Features

### Frontend
- View a list of constituents.
- Search and filter constituents by name or email.
- Sort constituents by name or signup date.
- View messages associated with a constituent.
- Reply to a constituents message (currently shows "Feature Coming Soon").
- Add new constituents (currently shows "Feature Coming Soon").
- Delete constituents with a confirmation alert.

### Backend
- Create, update, delete, and export constituents.
- Fetch a list of all constituents or new constituents added within the last week.
- Manage messages for specific constituents.
- Export constituent data as a CSV file.
- Mock data support for development.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/livnelson/indigov-project.git
cd indigov-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database
Ensure PostgreSQL is running.

#### Create the Database:

```bash
psql -U postgres -c "CREATE DATABASE indigov;"
```
Run the following SQL schema to create the required tables:
```bash
CREATE TABLE constituents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    constituent_id INT REFERENCES constituents(id) ON DELETE CASCADE,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Set Up Environment Variables
Create a .env file in the root directory with the following:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/indigov
PORT=5001
Replace username and password with your PostgreSQL credentials.
```

## Running the Application

### 1. Start the Backend Server
```bash
npm run dev
```
The server will start on http://localhost:5001.

### 2. Start the Frontend
In a separate terminal, navigate to the frontend directory and start the development server:

```bash
npm run dev
```
The app will be available at http://localhost:5173.

## API Endpoints
- Constituents
- GET /api/constituents: Fetch all constituents.
- GET /api/constituents/new: Fetch constituents created in the last 7 days.
- POST /api/constituents: Add a new constituent.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
## Acknowledgments
Frontend: React, TypeScript
Backend: Express.js, PostgreSQL
Styling: Vanilla CSS
