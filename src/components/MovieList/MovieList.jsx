import { Link } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div>
      <ul>
        {movies.map(item => (
          <li key={item.id} className={s.item}>
            <Link to={`/movies/${item.id.toString()}`} className={s.link}>
              {item.title}
            </Link>
            <p>
              Release year:{' '}
              <span className={s.span}>
                {item.release_date ? item.release_date.slice(0, 4) : ''}
              </span>
            </p>
            <p>
              Rating: <span className={s.span}>{item.vote_average}</span>⭐
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
