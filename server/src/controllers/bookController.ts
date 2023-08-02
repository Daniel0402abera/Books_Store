// Importing required modules and services
import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { transactionSchema } from "../utils/validator";
import { validator } from "../utils/helper";

// Creating an instance of the BookService class
const bookService = new BookService();
/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination (1-indexed).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of books to return per page.
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Internal server error
 */



// Endpoint to get all books
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    // Calling the BookService to get all books from the database
    const books = await bookService.getAllBooks();
    // Sending a JSON response with the list of books
    return res.status(200).json(books);
  } catch (error) {
    // Handling errors and sending an error response with status 500
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/book/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to fetch
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

// Endpoint to get a specific book by its ID
export const getBook = async (req: Request, res: Response) => {
  try {
    // Extracting the bookId from the request parameters
    const { bookId } = req.params;
    // Calling the BookService to get the book details based on the bookId
    const book = await bookService.getBook(bookId as string);
    // If no book is found, sending an error response with status 404
    if (!book) return res.status(404).json({ error: "Book not found" });
    // Sending a JSON response with the book details
    return res.status(200).json(book);
  } catch (error) {
    // Handling errors and sending an error response with status 500
    return res.status(500).json({ error: "Internal server error" });
  }
};


/**
 * @swagger
 * /api/book/buy:
 *   post:
 *     summary: Buy books using transaction
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionDTO'
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Invalid transaction data
 *       500:
 *         description: Internal server error
 */


// Endpoint to buy books using a transaction
export const buyBooks = async (req: Request, res: Response) => {
  // Extracting the bookPurchases data from the request body
  const bookPurchases = req.body;
  try {
    // Validating the transaction data using the validator function
    const error = validator(transactionSchema, bookPurchases);
    // If there are validation errors, sending a response with status 400
    if (error) return res.status(400).json(error);
    // Calling the BookService to handle the book purchases transaction
    const result = await bookService.buyBooks(bookPurchases);
    // Sending a JSON response with the result of the transaction
    return res.json(result);
  } catch (error: any) {
    // Handling errors and sending an error response with status 400
    return res.status(400).json({ error: error.message });
  }
};
