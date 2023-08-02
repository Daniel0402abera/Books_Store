import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { booksState } from '../state/books';
import { getBooks } from '../api/booksApi';

const useBooks = () => {
  const [books, setBooks] = useRecoilState(booksState);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [setBooks]);

  return { books };
};

export default useBooks;
