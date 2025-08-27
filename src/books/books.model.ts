import connectDB from "../db";
import mongoose, { Schema, Model } from "mongoose";

import { Book } from "./book.type";

const bookSchema: Schema<Book> = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: [String], required: true },
});

export const BookModel: Model<Book> = mongoose.model<Book>("Book", bookSchema);

export const getBooksModel = async (): Promise<Book[]> => {
    await connectDB();
    return BookModel.find().exec();
};
