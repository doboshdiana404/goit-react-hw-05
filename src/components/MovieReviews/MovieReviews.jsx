import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import s from './MovieReviews.module.css';
import { DNA } from 'react-loader-spinner';
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const reviews = await fetchMovieReviews(movieId);
      setReviews(reviews.results);
      setIsLoading(false);
    };
    getData();
  }, [movieId]);
  return (
    <div>
      {reviews.length && (
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
      )}
      ;
      {!reviews.length && (
        <p className={s.noReviews}>No reviews available for this movie.</p>
      )}
      {isLoading && (
        <DNA height={40} width={40} color="#4fa94d" ariaLabel="loading" />
      )}
    </div>
  );
};

export default MovieReviews;
