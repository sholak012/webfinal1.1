// components/BookItem.js
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BookItem = ({ book, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Удалить книгу?")) return;

    try {
      await axios.delete(`/api/books/${book._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Токен обязателен
        },
      });
      onDelete(book._id); // Обновляем UI
    } catch (error) {
      console.error("Ошибка удаления:", error.response?.data?.message);
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <button onClick={handleDelete}>🗑️ Удалить</button>
    </div>
  );
};