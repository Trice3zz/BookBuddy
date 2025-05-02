import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        setBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">📚 Library Catalog</h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <ul className="space-y-4" role="list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li
              key={book.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <Link to={`/books/${book.id}`} className="text-lg font-medium text-indigo-600 hover:underline">
                {book.title}
              </Link>
              <span className="ml-2 text-sm text-gray-500">
                {book.available ? "Available ✅" : "Checked out ❌"}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No books found for "{search}".</li>
        )}
      </ul>
    </section>
  );
};

export default BookList;

