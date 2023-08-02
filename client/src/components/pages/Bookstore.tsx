import React, { useState, useEffect } from 'react';
import RefreshControl from 'react-refresh-control';
import useBooks from '../../hooks/useBooks';
import BookList from '../../components/organisms/BookList';

const Bookstore: React.FC = () => {
  const { books: initialBooks } = useBooks();
  const [books, setBooks] = useState(initialBooks);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
   
  };

  const handleLoadMore = () => {
  
   const nextBatch = books;
    setBooks((prevBooks) => [...prevBooks, ...nextBatch]);
  };

  const hasMore = true; 

 
  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Bookstore</h1>
      <RefreshControl onRefresh={handleRefresh} refreshing={refreshing}>
        <BookList books={books} onLoadMore={handleLoadMore} hasMore={hasMore} />
      </RefreshControl>
    </div>
  );
};

export default Bookstore;
