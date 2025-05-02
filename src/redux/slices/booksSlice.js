import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data.books;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { list: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default booksSlice.reducer;
