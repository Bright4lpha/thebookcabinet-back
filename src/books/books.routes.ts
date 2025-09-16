var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import {
    getBookController,
    getBooksController,
    getBookByISBNController,
    postBookController,
    patchBookController,
    deleteBookController,
} from "./books.controller";

import { verifyJWT } from "../common/jwt.middleware";

router.get("/", verifyJWT, getBooksController);

router.get("/:id", function (req: Request, res: Response) {
    getBookController(req, res);
});

router.get("/isbn/:isbn", function (req: Request, res: Response) {
    getBookByISBNController(req, res);
});

router.post("/", verifyJWT, postBookController);

router.patch("/:bookId", verifyJWT, patchBookController);

router.delete("/:bookId", verifyJWT, deleteBookController);

module.exports = router;
export default router;
