var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import {
    getUserController,
    postUserController,
    loginUserController,
    deleteUserController,
} from "./users.controller";

router.get("/:id", function (req: Request, res: Response) {
    getUserController(req, res);
});

router.post("/", function (req: Request, res: Response) {
    postUserController(req, res);
});

router.post("/login", function (req: Request, res: Response) {
    loginUserController(req, res);
});

router.delete("/:id", function (req: Request, res: Response) {
    deleteUserController(req, res);
});

module.exports = router;
export default router;
