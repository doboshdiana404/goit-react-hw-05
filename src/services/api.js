import axios from 'axios';
// const API_KEY = '755e93f2f2d052187e98e8094e446d4f';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTVlOTNmMmYyZDA1MjE4N2U5OGU4MDk0ZTQ0NmQ0ZiIsIm5iZiI6MTczNjQ1MDI1MS41ODUsInN1YiI6IjY3ODAyMGNiZWU4NGZhNGRlZjdhZjM5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e-ngPyEaMV9SWtMvEOzm1MuJ29fe4TSKSUDcDadGRzo';

axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
axios.defaults.params = {
  language: 'en-US',
};
export const fetchTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day');
  return data.results;
};
export const fetchDetailsMovies = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};
export const fetchMovieCast = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  console.log(data);

  return data;
};
export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  console.log(data.results);

  return data;
};
