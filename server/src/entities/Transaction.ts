// Importing required decorators and classes from the TypeORM library.
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

// Importing the Book entity which will be used in the ManyToOne relationship.
import { Book } from "./Book";

// Defining the Transactions entity as an annotated class with the @Entity decorator.
@Entity()
export class Transactions {
  // Defining the primary key column with the @PrimaryGeneratedColumn decorator.
  @PrimaryGeneratedColumn()
  id: number;

  // Defining a regular column to store the bookId with the @Column decorator.
  @Column()
  bookId: number;

  // Establishing a Many-to-One relationship between Transactions and Book entities.
  // The @ManyToOne decorator defines the relationship with the Book entity.
  // The first parameter of @ManyToOne is a function that returns the target entity (Book).
  // The second parameter specifies the inverse side of the relationship in the Book entity.
  @ManyToOne(() => Book, (book) => book.transactions)
  // Using the @JoinColumn decorator to specify the column that links this entity to the Book entity.
  // In this case, it's using the "bookId" column from this entity to link to the "id" column of the Book entity.
  @JoinColumn({ name: "bookId" }) 
  // Creating a property named "book" to store the related Book object.
  book: Book; 
}
