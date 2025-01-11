import { lazy, useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import s from './HomePage.module.css';
import { DNA } from 'react-loader-spinner';
const MovieList = lazy(() => import('../../components/MovieList/MovieList'));
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await fetchTrendingMovies();
      setMovies(data);
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <div className={s.homeSection}>
      <h2 className={s.title}>Trending today</h2>
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
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
