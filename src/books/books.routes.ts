var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import { getBookController, getBooksController } from "./books.controller";

router.get("/", function (req: Request, res: Response) {
    getBooksController(req, res);
});

router.get("/:id", function (req: Request, res: Response) {
    getBookController(req, res);
});

module.exports = router;
export default router;
