import React from 'react';

interface BookCardProps {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, discountRate, coverImage, price }) => {
  return (
     <div
      className="h-[257px] w-[187px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[400px] 
      bg-white  rounded-md p-2">
      <div
        className="h-[187px] w-[187px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[400px] 
      flex justify-center">
        <img
          className="h-[100%] w-[100%] object-contain"
          src={coverImage}
          alt={title}
        />
      </div>
      <div className="px-3 py-1">
        <p className="text-sm font-medium">
          {title.length > 17
            ? `${title.substr(0, 15)}.. .`
            : title.substr(0, 17)}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-red-500 font-bold text-sm">{discountRate}%</p>
          <p className="font-bold text-lg">{price}$</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
