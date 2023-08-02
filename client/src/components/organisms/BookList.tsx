import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookCard from '../molecules/BookCard';

interface BookListProps {
  books: Book[];
  onLoadMore: () => void;
  hasMore: boolean;
}

interface Book {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

const BookList: React.FC<BookListProps> = ({ books, onLoadMore, hasMore }) => {
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    // Check if we have reached 80% of the floor
    if (scrollPercentage >= 80) {
      onLoadMore(); // Load more books
    }
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      // onScroll={handleScroll}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default BookList;
