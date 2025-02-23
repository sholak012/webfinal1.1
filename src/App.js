import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import Profile from './pages/Profile';
import API from './api/api';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get('/auth/me'); // Проверяем авторизацию
        if (res.data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout'); // Отправляем запрос на выход
      setIsAuthenticated(false);
      window.location.href = "/login"; // Перенаправляем на страницу входа
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/my-books">My Books</Link>
          <Link to="/add-book">Add Book</Link>
          <Link to="/profile">Profile</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <div className="main-container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-books" element={isAuthenticated ? <MyBooks /> : <Navigate to="/login" />} />
            <Route path="/add-book" element={isAuthenticated ? <AddBook /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/my-books" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
