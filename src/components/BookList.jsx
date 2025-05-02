import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  UserContext  from './UserContext';
import BookDetail from './BookDetail';
const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        setBooks(data|| []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleCheckout = async (bookId) => {
    try {
      await axios.post(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      alert('Book checked out!');
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === bookId ? { ...b, available: False } : b
        )
      );
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to check out book');
    }
  };

  if (!books.length) 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">📚 Book List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center"
          >
            {book.coverimage ? (
              <img
                src={book.coverimage}
                alt={book.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-2 rounded">
                No Cover
              </div>
            )}
            <h3 className="font-medium text-indigo-600 text-center">{book.title}</h3>
            <p className="text-sm text-gray-500 text-center mb-1">
              {book.author}
            </p>
            <p className="text-sm text-gray-600 text-center mb-2">
              {book.available ? 'Available ✅' : 'Checked out ❌'}
            </p>
            <Link
              to={`/books/${book.id}`}
              className="text-sm text-blue-500 underline mb-2"
            >
              View Details
            </Link>
            {user && book.available && (
              <button
                onClick={() => handleCheckout(book.id)}
                className="mt-auto px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Check Out
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default BookList;

