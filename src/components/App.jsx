import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from './Navigation/Navigation';
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import { lazy, Suspense } from 'react';
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<h3> </h3>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
