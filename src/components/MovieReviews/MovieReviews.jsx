import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import s from './MovieReviews.module.css';
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const reviews = await fetchMovieReviews(movieId);
      setReviews(reviews.results);
      console.log(reviews.results);
    };
    getData();
  }, [movieId]);
  return (
    <div>
      <ul className={s.listReviews}>
        {reviews.map(item => (
          <li key={item.id} className={s.itemRating}>
            <p>⭐{item.author_details.rating}/10</p>
            <h4>
              Author:<span> {item.author}</span>
            </h4>
            <p className={s.description}>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
