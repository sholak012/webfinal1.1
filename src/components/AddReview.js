// AddReview.js
import StarRating from './AddReview';

const AddReview = ({ bookId }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    await axios.post(`/api/books/${bookId}/reviews`, { rating, comment });
  };

  return (
    <div>
      <StarRating rating={rating} onRate={setRating} />
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
};