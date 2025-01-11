import { useEffect, useRef, useState } from 'react';
import { fetchDetailsMovies } from '../../services/api';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { DNA } from 'react-loader-spinner';
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const details = await fetchDetailsMovies(movieId);
      setDetails(details);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [movieId]);
  if (isLoading) {
    return (
      <div className={s.load}>
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }
  return (
    <div className={s.sectionDetails}>
      <Link to={goBackRef.current} className={s.goBack}>
        <FaArrowLeft />
        Go back
      </Link>
      <div className={s.itemWrap}>
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.overview}
          width={300}
        />
        <div className={s.description}>
          <h3 className={s.title}>
            {details.title}{' '}
            <span>
              ({details.release_date ? details.release_date.slice(0, 4) : ' '})
            </span>
          </h3>
          <p className={s.text}>
            User score:{' '}
            {details.vote_average ? Math.round(details.vote_average * 10) : ' '}
            %
          </p>
          <h4 className={s.text}>Overview</h4>
          <p className={`${s.text} ${s.overview}`}>{details.overview}</p>
          <h4 className={s.text}>Genres</h4>
          <p className={s.text}>
            {details.genres
              ? details.genres.map(genre => genre.name).join(', ')
              : ' '}
          </p>
        </div>
      </div>
      <div className={s.infoWrap}>
        <h4 className={`${s.text} ${s.addInf}`}>Additional information</h4>
        <nav>
          <ul className={s.listNav}>
            <li>
              <Link to="cast" className={s.link}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className={s.link}>
                Reviews
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
