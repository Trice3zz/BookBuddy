const BASE_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

export const fetchBooks = async () => {
  const response = await fetch(`${BASE_URL}books`);
  const data = await response.json();
  return data.books;
};

export const fetchBookDetail = async (id) => {
  const response = await fetch(`${BASE_URL}books/${id}`);
  const data = await response.json();
  return data.book;
};

export const checkoutBook = async (id) => {
  const response = await fetch(`${BASE_URL}books/checkout/${id}`, {
    method: 'POST',
  });
  const data = await response.json();
  return data.book;
};
