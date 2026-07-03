const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Build the connection string from env vars (pass secrets at runtime, never bake them in).
//   MONGO_DB_USERNAME  - mongo user            (default: root)
//   MONGO_DB_PWD       - mongo password        (default: qwert)  -> pass with: -e MONGO_DB_PWD=...
//   MONGO_DB_HOST      - host: "localhost" on your machine, "mongo" inside the docker network
//   MONGO_DB_PORT      - mongo port            (default: 27017)
// A full MONGO_URL, if provided, overrides all of the above.
const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME || "root";
const MONGO_DB_PWD = process.env.MONGO_DB_PWD || "qwert";
const MONGO_DB_HOST = process.env.MONGO_DB_HOST || "localhost";
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || "27017";

const MONGO_URL =
    process.env.MONGO_URL ||
    `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PWD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/?authSource=admin`;

const DB_NAME = process.env.MONGO_DB_NAME || "OPQ_docker_demo";

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
