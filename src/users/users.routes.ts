var express = require("express");
var router = express.Router();

import { Request, Response } from "express";
import {
    getUserController,
    postUserController,
    loginUserController,
    deleteUserController,
    getUsernameController,
    getEmailController,
    getMeController,
} from "./users.controller";
import { verifyJWT } from "../middleware/jwt.middleware";

router.get("/me", verifyJWT, getMeController);

router.get("/:id", function (req: Request, res: Response) {
    getUserController(req, res);
});

router.get("/username/:username", async (req: Request, res: Response) => {
    await getUsernameController(req, res);
});
router.get("/email/:email", async (req: Request, res: Response) => {
    await getEmailController(req, res);
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
