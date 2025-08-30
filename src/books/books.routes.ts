var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import {
    getBookController,
    getBooksController,
    postBookController,
    patchBookController,
    deleteBookController,
} from "./books.controller";

router.get("/", function (req: Request, res: Response) {
    getBooksController(req, res);
});

router.get("/:id", function (req: Request, res: Response) {
    getBookController(req, res);
});

router.post("/", function (req: Request, res: Response) {
    postBookController(req, res);
});

router.patch("/:bookId", patchBookController);

router.delete("/:bookId", deleteBookController);

module.exports = router;
export default router;
