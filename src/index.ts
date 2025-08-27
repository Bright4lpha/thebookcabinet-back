import express from "express";
import connectDB from "./db";

import booksRouter from "./books/books.routes";
import path from "path";

const app = express();
const PORT = 4000;

app.use(express.json());

connectDB();

app.use("/books", booksRouter);
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
