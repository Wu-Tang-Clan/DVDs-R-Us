import React from 'react';
import { Link } from 'react-router-dom';

const singleMovieBox = (movie) => (
  <div key={movie.id} className="box" style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div className="column is-one-third">
      <img src={movie.poster} alt={movie.name} width="80" height="100" />
    </div>
    <div className="column">
      <p key={movie.id}>
        <Link to={`browse/${movie.id}`}>
          {movie.title}
          {' '}
          (
          {movie.year}
          )
        </Link>
        {' '}
      </p>
      <p className="subtitle is-6" style={{ marginTop: '20px' }}>
        Starring:
        {movie.actors.join(', ')}
      </p>
      <p className="subtitle is-6" style={{ marginTop: '20px' }}>
        Runtime:
        {movie.runtime}
      </p>
    </div>
    <button type="submit" style={{ margin: '10px' }} className="button">Add To Cart</button>
    <button type="submit" style={{ margin: '10px' }} className="button">Add to Wishlist</button>
  </div>
);
export default singleMovieBox;
