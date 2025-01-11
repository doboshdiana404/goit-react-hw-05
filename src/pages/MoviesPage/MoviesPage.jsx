import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import s from './MoviesPage.module.css';
import { fetchSearchMovies } from '../../services/api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { DNA } from 'react-loader-spinner';
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const [queryInput, setQueryInput] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      setIsLoading(true);
      const results = await fetchSearchMovies(query);
      setMovies(results);
      setIsLoading(false);
    };

    getMovies();
  }, [query]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (queryInput.trim()) {
      setSearchParams({ query: queryInput.trim() });
    }
    setQueryInput('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.wrap}>
          <input
            className={s.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
          />
          <button className={s.icon}>
            <CiSearch className={s.searchIcon} />
          </button>
        </label>
      </form>
      <div
        style={{
          display: 'flex',
          paddingLeft: '200px',

          height: '40px',
        }}
      >
        {isLoading && (
          <DNA height={40} width={40} color="#4fa94d" ariaLabel="loading" />
        )}
      </div>
      {movies.length > 0 && query && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li key={movie.id} className={s.listItem}>
              <Link
                to={`/movies/${movie.id}`}
                className={s.link}
                state={location}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {movies.length < 0 && (
        <p className={s.noResults}>No movies found for {query}.</p>
      )}
    </div>
  );
};

export default MoviesPage;
