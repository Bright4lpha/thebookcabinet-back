import { Request, Response } from "express";
import { Book } from "./book.type";
import { getBooksModel } from "./books.model";

export const getBooksController = async (_req: Request, res: Response) => {
    try {
        const books: Array<Book> = await getBooksModel();
        if (books.length === 0) {
            return res.status(404).json({ error: "No books found" });
        }
        return res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
