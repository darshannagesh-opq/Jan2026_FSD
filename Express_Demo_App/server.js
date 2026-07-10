// Movie Watchlist API — a minimal Express server for teaching.
// No database, no auth: movies live in an in-memory array.

const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins (fine for a demo / teaching API).
app.use(cors());
// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// --- In-memory "database" -------------------------------------------------
// Seeded with a few movies so the API returns data immediately.
let movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "The Godfather", genre: "Crime", rating: 9.2 },
  { id: 3, title: "Spirited Away", genre: "Animation", rating: 8.6 },
  { id: 4, title: "Parasite", genre: "Thriller", rating: 8.5 },
];

// Tracks the next id to hand out. Starts after the seeded movies.
let nextId = 5;

// --- Routes ---------------------------------------------------------------

// Health check — App Runner pings this to confirm the app is alive.
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Return the full list of movies.
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Add a new movie. Client sends { title, genre, rating }; we assign the id.
app.post("/api/movies", (req, res) => {
  const { title, genre, rating } = req.body;

  const movie = {
    id: nextId++,
    title,
    genre,
    rating,
  };

  movies.push(movie);
  res.status(201).json(movie); // 201 Created + the new movie
});

// Delete a movie by id.
app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id); // params are strings; convert to number
  movies = movies.filter((movie) => movie.id !== id);
  res.status(200).json({ message: `Movie ${id} deleted` });
});

// Friendly root message so hitting "/" in a browser shows something.
app.get("/", (req, res) => {
  res.send("Movie Watchlist API running");
});

// --- Start the server -----------------------------------------------------
// App Runner provides PORT and requires binding to 0.0.0.0.
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Movie Watchlist API listening on port ${PORT}`);
});
