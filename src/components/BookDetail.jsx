import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetail } from '../api'; 

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await fetchBookDetail(id);
      setBook(fetchedBook);
    };
    loadBook();
  }, [id]);

  if (!book) 

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>{book.description}</p>
      <Link to={`/checkout/${book.id}`}>Checkout</Link>
    </div>
  );
};

export default BookDetail;
