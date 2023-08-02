import { atom } from 'recoil';

interface Book {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

export const booksState = atom<Book[]>({
  key: 'booksState',
  default: [],
});
