import axios from 'axios';

export async function getBooks(): Promise<Book[]> {
  const response = await axios.get('http://localhost:5000/api/book'); 
  return response.data;
}

interface Book {
  title: string;
  discountRate: number;
  coverImage: string;
  price: number;
}
