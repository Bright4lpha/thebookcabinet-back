require("dotenv").config();
const jwt = require("jsonwebtoken");

import { Request, Response } from "express";
import { User } from "./user.type";
import {
    getUserModel,
    postUserModel,
    loginUserModel,
    deleteUserModel,
} from "./users.model";

export const getUserController = async (req: Request, res: Response) => {
    try {
        const user: User | null = await getUserModel(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const postUserController = async (req: Request, res: Response) => {
    try {
        const newUser: User = req.body;
        const createdUser = await postUserModel(newUser);
        return res.status(201).json(createdUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const user = await loginUserModel(req.body);
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const deletedUser = await deleteUserModel(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
