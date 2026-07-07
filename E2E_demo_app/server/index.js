// Load environment variables from .env into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());          // allow the React frontend to call this API
app.use(express.json());  // parse JSON request bodies

// --- Health check ---------------------------------------------------------
// Used to confirm the server is up (handy when testing a deploy).
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// --- List all contacts ----------------------------------------------------
app.get("/api/contacts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contacts ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Create a contact -----------------------------------------------------
app.post("/api/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    res.status(201).json({ id: result.insertId, name, email, phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Update a contact -----------------------------------------------------
app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    await db.query(
      "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, id]
    );
    res.json({ id: Number(id), name, email, phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Delete a contact -----------------------------------------------------
app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM contacts WHERE id = ?", [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Start the server -----------------------------------------------------
// Listen on the port from the environment (or 5000) and bind to 0.0.0.0
// so the server is reachable from outside the machine (needed on AWS).
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
