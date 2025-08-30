import { Request, Response } from "express";
import { Book } from "./book.type";
import { getBooksModel, getBookModel } from "./books.model";

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

export const getBookController = async (_req: Request, res: Response) => {
    try {
        const book: Book | null = await getBookModel(_req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
