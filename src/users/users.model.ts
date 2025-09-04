import connectDB from "../db";
import mongoose, { Schema, Model } from "mongoose";

import { User } from "./user.type";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema: Schema<User> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel: Model<User> = mongoose.model<User>("User", userSchema);

export const getUserModel = async (id: string): Promise<User | null> => {
    await connectDB();
    return UserModel.findById(id).exec();
};

export const postUserModel = async (user: User): Promise<User> => {
    await connectDB();
    const newUser = new UserModel({
        email: user.email,
        username: user.username,
        password: await hashPassword(user.password),
    });
    return newUser.save();
};

export const loginUserModel = async (credentials: {
    email: string;
    password: string;
}): Promise<User | null> => {
    await connectDB();
    const user = await UserModel.findOne({ email: credentials.email }).exec();
    if (user && (await validateUser(credentials.password, user.password))) {
        return user;
    } else {
        return null;
    }
};

export const deleteUserModel = async (id: string): Promise<User | null> => {
    await connectDB();
    return UserModel.findByIdAndDelete(id).exec();
};

async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(
            password,
            saltRounds,
            (err: any, hash: string | PromiseLike<string>) => {
                if (err) reject(err);
                else resolve(hash);
            }
        );
    });
}

async function validateUser(password: string, hash: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err: any, result: boolean) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
