# Movie Watchlist API

A minimal Express API
No database, no auth — movies are stored in an in-memory array.

## Routes

| Method | Path               | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/`                | Plain text: "Movie Watchlist API running" |
| GET    | `/api/health`      | Health check → `{ "status": "ok" }` |
| GET    | `/api/movies`      | List all movies                    |
| POST   | `/api/movies`      | Add a movie (auto-generates `id`)  |
| DELETE | `/api/movies/:id`  | Remove a movie by `id`             |

A movie looks like: `{ id, title, genre, rating }`.

## Run locally

```bash
npm install
npm start
```

The server listens on `http://localhost:8080` (or `$PORT` if set).

Try it:

```bash
curl http://localhost:8080/api/movies

curl -X POST http://localhost:8080/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","genre":"Sci-Fi","rating":8.0}'

curl -X DELETE http://localhost:8080/api/movies/1
```

## Build and run with Docker

```bash
# Build the image
docker build -t movie-watchlist-api .

# Run it, mapping container port 8080 to your machine
docker run -p 8080:8080 movie-watchlist-api
```

Then visit `http://localhost:8080/api/movies`.

## Notes for deployment (AWS App Runner)

- The server binds to `0.0.0.0` and uses `process.env.PORT || 8080`, which App Runner requires.
- Point the App Runner **health check** at `/api/health`.
