# Contacts — Three-Tier CRUD Demo

A minimal three-tier app for teaching AWS deployment.

- **Frontend:** React (Vite), plain `fetch`
- **Backend:** Node + Express REST API
- **Database:** MySQL (via `mysql2` connection pool)

One entity: **Contacts** (`id`, `name`, `email`, `phone`). Add, list, edit, delete.

```
E2E_demo_app/
  client/    React + Vite frontend
  server/    Express API + MySQL
```

---

## 1. Set up the database

Create the database and table using the provided schema. From MySQL (local, or RDS):

```bash
mysql -h <DB_HOST> -u <DB_USER> -p < server/schema.sql
```

Or paste the contents of [server/schema.sql](server/schema.sql) into a MySQL client.

## 2. Run the backend

```bash
cd server
npm install
cp .env.example .env     # then edit .env with your DB values
npm start
```

The API runs on `http://localhost:5000` by default.
Test it: `http://localhost:5000/api/health` should return `OK`.

## 3. Run the frontend

In a second terminal:

```bash
cd client
npm install
cp .env.example .env     # defaults to http://localhost:5000
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## Environment variables

**server/.env**

| Variable      | Meaning                        |
| ------------- | ------------------------------ |
| `DB_HOST`     | MySQL host (e.g. RDS endpoint) |
| `DB_USER`     | MySQL user                     |
| `DB_PASSWORD` | MySQL password                 |
| `DB_NAME`     | Database name                  |
| `DB_PORT`     | MySQL port (usually 3306)      |
| `PORT`        | Port the API listens on        |

**client/.env**

| Variable       | Meaning                                    |
| -------------- | ------------------------------------------ |
| `VITE_API_URL` | Base URL of the backend API                |

## API routes

| Method | Route                | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/api/health`        | Health check       |
| GET    | `/api/contacts`      | List all contacts  |
| POST   | `/api/contacts`      | Create a contact   |
| PUT    | `/api/contacts/:id`  | Update a contact   |
| DELETE | `/api/contacts/:id`  | Delete a contact   |
