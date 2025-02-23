// pages/BookList.js
const BookList = () => {
    const [books, setBooks] = useState([]);
  
    // Функция для обновления списка
    const handleDelete = (deletedBookId) => {
      setBooks(books.filter((book) => book._id !== deletedBookId));
    };
  
    return (
      <div>
        {books.map((book) => (
          <BookItem key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    );
  };