import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import BookList from './components/BookList.jsx';
import BookDetail from './components/BookDetail.jsx';
import LoginRegister from './LoginRegister.jsx';
import BookCheckout from './BookCheckout.jsx';
import { UserProvider } from './components/UserContext.jsx';
import Account from './components/Account.jsx';
import Login from './components/LoginForm.jsx';
import Register from './components/RegisterForm.jsx';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books'
        );
        console.log("Fetched books:", data); 
        setBooks(data || []);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-indigo-700">
        📚 Welcome to BookBuddy
      </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.slice(0, 40).map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              {book.coverimage ? (
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500 mb-3">
                  No Cover Image
                </div>
              )}
              <h3 className="text-center font-semibold text-indigo-700">{book.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {book.available ? 'Available ✅' : 'Checked out ❌'}
              </p>
            </Link>
          ))}
        </div>
      
    </section>
  );
};

const App = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="bg-white shadow p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-indigo-600">📚 BookBuddy</h1>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
            <Link to="/books" className="text-indigo-600 hover:underline">Book List</Link>
            <Link to="/account" className="text-indigo-600 hover:underline">Account</Link>
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
