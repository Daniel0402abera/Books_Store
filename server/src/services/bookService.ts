import { data } from "../utils/data";
import { Book } from "../entities/Book";
import { AppDataSource } from "../utils/connectionDB";
import { Repository } from "typeorm";
import { BookInputs, BookPurchase } from "utils/interfaces";
import { Transactions } from "../entities/Transaction";

export class BookService {
  private bookRepository: Repository<Book>;
  transactionRepository: Repository<Transactions>;

  constructor() {
    this.bookRepository = AppDataSource.getRepository(Book);
    this.transactionRepository = AppDataSource.getRepository(Transactions);
  }

  getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ["transactions"] });
  }

  getBook(id: string): Promise<Book | null> {
    const bookId = parseInt(id);
    return this.bookRepository.findOne({
      where: { id: bookId },
    });
  }

  seedingBooks(): Promise<Book[]> {
    return this.bookRepository.save(data);
  }

  addBook(bookInput: BookInputs): Promise<Book> {
    const book = new Book();
    book.title = bookInput.title;
    book.image = bookInput.image;
    book.discount = bookInput.discount;
    book.price = bookInput.price;
    return this.bookRepository.save(book);
  }

  async buyBooks({ bookId}: BookPurchase) {
    const Id = parseInt(bookId);
    const book: any = await this.bookRepository.findOne({
      where: { id: Id },
    });

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    
    await this.bookRepository.save(book);
    const transactionData = new Transactions();
    transactionData.bookId = book.id;
    const transaction = await this.transactionRepository.save(transactionData);
    return transaction;
  }
}
