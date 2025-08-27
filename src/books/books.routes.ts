var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import { getBooksController } from "./books.controller";

router.get("/", function (req: Request, res: Response) {
    getBooksController(req, res);
});

module.exports = router;
export default router;
