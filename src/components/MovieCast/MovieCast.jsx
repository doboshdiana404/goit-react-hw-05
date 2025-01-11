import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import { useEffect, useState } from 'react';
import s from './MovieCast.module.css';
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const cast = await fetchMovieCast(movieId);
      setCast(cast.cast);
      console.log(cast);
    };
    getData();
  }, [movieId]);
  return (
    <div>
      <ul className={s.listCast}>
        {cast.map(item => (
          <li key={item.id} className={s.itemCast}>
            <div>
              <h4>{item.name}</h4>
              <p>Character: {item.character}</p>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt=""
              width={200}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
