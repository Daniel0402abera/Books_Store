// Importing required decorators and classes from the TypeORM library.
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

// Importing the Transactions entity which will be used in the OneToMany relationship.
import { Transactions } from "./Transaction";

// Defining the Book entity as an annotated class with the @Entity decorator.
@Entity()
export class Book {
  // Defining the primary key column with the @PrimaryGeneratedColumn decorator.
  @PrimaryGeneratedColumn()
  id: number;

  // Defining a column to store the title of the book with the @Column decorator.
  @Column()
  title: string;

  // Defining a column to store the image path of the book with the @Column decorator.
  @Column()
  image: string;

  // Defining a column to store the discount percentage of the book with the @Column decorator.
  @Column()
  discount: number;

  // Defining a column to store the price of the book with the @Column decorator.
  @Column()
  price: number;

  // Establishing a One-to-Many relationship between Book and Transactions entities.
  // The @OneToMany decorator defines the relationship with the Transactions entity.
  // The first parameter of @OneToMany is a function that returns the target entity (Transactions).
  // The second parameter specifies the inverse side of the relationship in the Transactions entity,
  // which is the "book" property in the Transactions entity.
  @OneToMany(() => Transactions, (transaction) => transaction.book) 
  // Creating a property named "transactions" to store an array of related Transactions objects.
  transactions: Transactions[]; 
}
