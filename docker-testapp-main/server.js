const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// http://localhost:8081 -> admin, pass
// Running on the HOST: localhost:27017 -> the Docker "mongo" container (root:qwert, authSource=admin).
// If this app later runs as a container on the same docker network, override with:
//   MONGO_URL=mongodb://root:qwert@mongo:27017/?authSource=admin
const MONGO_URL = process.env.MONGO_URL || "mongodb://root:qwert@localhost:27017/?authSource=admin";
const DB_NAME = "OPQ_docker_demo";

const client = new MongoClient(MONGO_URL);
let db;

//GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const data = await db.collection("users").find({}).toArray();
        res.send(data);
    } catch (err) {
        console.error("getUsers failed:", err.message);
        res.status(500).send({ error: "Failed to fetch users" });
    }
});

//POST new user
app.post("/addUser", async (req, res) => {
    try {
        const userObj = req.body;
        console.log("new user:", userObj);
        const data = await db.collection("users").insertOne(userObj);
        console.log("data inserted in DB");
        res.send(data);
    } catch (err) {
        console.error("addUser failed:", err.message);
        res.status(500).send({ error: "Failed to add user" });
    }
});

// Connect to Mongo ONCE at startup, then start the server.
async function start() {
    try {
        await client.connect();
        db = client.db(DB_NAME);
        console.log(`Connected to MongoDB (${DB_NAME})`);

        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Could not connect to MongoDB:", err.message);
        process.exit(1);
    }
}

start();
