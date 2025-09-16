import { Request, Response } from "express";
import { Book } from "./book.type";
import {
    getBooksModel,
    getBookModel,
    postBookModel,
    deleteBookModel,
    patchBookModel,
    getBookByISBNModel,
} from "./books.model";

interface AuthRequest extends Request {
    auth?: {
        userId: string;
        username: string;
        email: string;
    };
}

export const getBooksController = async (req: AuthRequest, res: Response) => {
    try {
        console.log("Request auth data:", req.auth);
        if (!req.auth || !req.auth.userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Missing authentication" });
        }
        console.log("Fetching books for user ID:", req.auth.userId);
        const books: Array<Book> = await getBooksModel(req.auth.userId);
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

export const getBookByISBNController = async (_req: Request, res: Response) => {
    try {
        const isbn: string = _req.params.isbn;
        const book: Book | null = await getBookByISBNModel(isbn);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book by ISBN:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const postBookController = async (req: AuthRequest, res: Response) => {
    try {
        const newBook: Book = { ...req.body, userId: req.auth?.userId };
        const createdBook = await postBookModel(newBook);
        return res.status(201).json(createdBook);
    } catch (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const patchBookController = async (req: Request, res: Response) => {
    try {
        console.log("Request params:", req.body);
        const updatedBook = await patchBookModel(req.params.bookId, req.body);
        console.log("Updated book:", updatedBook);
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteBookController = async (req: Request, res: Response) => {
    try {
        const deletedBook = await deleteBookModel(req.params.bookId);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
