import express from "express";
import cors from "cors";
import connectDatabase from "../src/utils/connectionDB";
import bookRouter from "./routes/bookRouter";
import transactionRouter from "./routes/transactionRouter";
import swaggerDocs from "./utils/swagger";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: true }));

// API END-POINTS
app.use("/api/book", bookRouter);
app.use("/api/transaction", transactionRouter); 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();
    console.log(`Connected to the database successfully`);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      swaggerDocs(app, PORT);
    });
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
};

startServer();
