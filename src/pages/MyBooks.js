// src/pages/MyBooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

useEffect(() => {
  setFilteredBooks(books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  ));
}, [search, books]);

<input type="text" placeholder="Search books..."
  value={search} onChange={(e) => setSearch(e.target.value)}
  className="border p-2 w-full"
></input>

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (error) {
      alert('Failed to fetch books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>My Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} - {book.author} ({book.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBooks;
