import connectDB from "../db";
import mongoose, { Schema, Model } from "mongoose";

import { Book } from "./book.type";

const bookSchema: Schema<Book> = new Schema({
    title: { type: String, required: true },
    author: { type: [String], required: true },
    genre: { type: [String], required: false },
    url_image: { type: String, required: false },
    isbn: { type: String, required: false },
    language: { type: String, required: false },
    description: { type: String, required: false },
    publishedDate: { type: String, required: false },
    publisher: { type: String, required: false },
    pages: { type: Number, required: false },
});

export const BookModel: Model<Book> = mongoose.model<Book>("Book", bookSchema);

export const getBooksModel = async (): Promise<Book[]> => {
    await connectDB();
    return BookModel.find().exec();
};

export const getBookModel = async (id: string): Promise<Book | null> => {
    await connectDB();
    return BookModel.findById(id).exec();
};

export const getBookByISBNModel = async (
    isbn: string
): Promise<Book | null> => {
    await connectDB();
    return BookModel.findOne({ isbn }).exec();
};

export const postBookModel = async (book: Book): Promise<Book> => {
    await connectDB();
    const newBook = new BookModel(book);
    return newBook.save();
};

export const patchBookModel = async (
    id: string,
    book: Partial<Book>
): Promise<Book | null> => {
    await connectDB();
    console.log("Updating book with ID:", id, "with data:", book);

    return BookModel.findByIdAndUpdate(id, book, { new: true }).exec();
};

export const deleteBookModel = async (id: string): Promise<Book | null> => {
    await connectDB();
    return BookModel.findByIdAndDelete(id).exec();
};
