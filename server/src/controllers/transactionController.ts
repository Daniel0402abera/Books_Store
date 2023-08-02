/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing transactions
 */

// Importing required modules and services
import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

// Creating an instance of the TransactionService class
const transactionService = new TransactionService();

/**
 * @swagger
 * /api/tansaction:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of transactions
 *       500:
 *         description: Internal server error
 */

// Endpoint to get all transactions
export const getTransactions = async (_req: Request, res: Response) => {
  try {
    // Calling the TransactionService to get all transactions from the database
    const transactions = await transactionService.getTransactions();
    // Sending a JSON response with the list of transactions
    return res.status(200).json(transactions);
  } catch (error) {
    // Handling errors and sending an error response with status 500
    return res.status(500).json({ error: "Internal server error" });
  }
};
