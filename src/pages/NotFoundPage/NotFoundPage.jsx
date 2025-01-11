import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import s from '../MovieDetailsPage/MovieDetailsPage.module.css';
const NotFound = () => {
  return (
    <div>
      <h2> 404 Page not found </h2>
      <Link to="/" className={s.goBack}>
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
