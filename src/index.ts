import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db";

// Import routes
import booksRouter from "./books/books.routes";
import usersRouter from "./users/users.routes";

const app = express();
const PORT = 4000;

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());
// autoriser seulement le front React
app.use(
    cors({
        origin: process.env.FRONT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();

app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => {
    res.send(
        `Hello from The Book Cabinet ! Your Node Express server is running on port ${PORT}`
    );
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yamljs");
require("dotenv").config();

// const swaggerPath = path.join(__dirname, "swagger.yaml");
// const file = fs.readFileSync(swaggerPath, "utf8");
// const file = fs.readFileSync("./src/swagger.yaml", "utf8");
const swaggerDocument = YAML.load("./src/swagger.yaml");

swaggerDocument.servers = [
    {
        url: process.env.SERVER_URL,
    },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
