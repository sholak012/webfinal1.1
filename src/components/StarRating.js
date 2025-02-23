// components/StarRating.js
import './StarRating.css'; // Создайте файл стилей

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'active' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};