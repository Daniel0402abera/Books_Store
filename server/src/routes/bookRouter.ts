// Importing the controller functions from "../controllers/bookController".
import {
  buyBooks,
  getAllBooks,
  getBook,
} from "../controllers/bookController";

// Importing the Express framework.
import express from "express";

// Creating an instance of the Express router.
const bookRouter = express.Router();

// Endpoint to handle the "buyBooks" functionality with HTTP POST method.
bookRouter.post("/buy", buyBooks);

// Endpoint to handle the "getBook" functionality with HTTP GET method.
// The ":bookId" in the URL is a dynamic parameter that represents the ID of the book to fetch.
bookRouter.get("/:bookId", getBook);

// Endpoint to handle the "getAllBooks" functionality with HTTP GET method.
// This endpoint is triggered when the client sends an HTTP GET request to "/api/book".
bookRouter.route("/").get(getAllBooks);

// Exporting the bookRouter to be used in other parts of the application.
export default bookRouter;
