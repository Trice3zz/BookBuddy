import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { useAuth } from './UserContext';
import { fetchBookDetail, checkoutBook } from './api'; // Assuming you've created an API utility

const BookCheckout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook
  const [book, setBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const fetchedBook = await fetchBookDetail(id);
      setBook(fetchedBook);
    };
    loadBook();
  }, [id]);

  const handleCheckout = async () => {
    if (!user) {
      alert('You need to be logged in to checkout a book');
      return;
    }
    await checkoutBook(id);
    navigate('/'); // Redirect to homepage after successful checkout
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-checkout">
      <h2>Checkout Book</h2>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default BookCheckout;
