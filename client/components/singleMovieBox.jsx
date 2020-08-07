/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cart/actions';

class SingleMovieBox extends Component {
  state = {
    quantity: 1,
  }

  render() {
    const { movie, history, addToCart } = this.props;
    const { quantity } = this.state;
    // console.log(movie);
    return (
      <div key={movie.id} className="box" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="columns is-vcentered">
          <div className="column is-3">
            <img src={movie.poster} alt={movie.name} width="80" height="100" />
          </div>
          <div className="column is-6">
            <div className="field">
              <div className="control">
                <Link
                  className="titleLink"
                  to={`${history.location.pathname.slice(1)}/${movie.id}`}
                >
                  {movie.title}
                  {' '}
                  (
                  {movie.year}
                  )
                </Link>
                {' '}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <p className="subtitle is-6" style={{ marginTop: '20px' }}>
                  Starring:
                  {movie.actors.join(', ')}
                </p>
                <p className="subtitle is-6" style={{ marginTop: '20px' }}>
                  Runtime:
                  {movie.runtime}
                </p>
                <p className="subtitle is-6" style={{ marginTop: '20px' }}>
                  {`Price: $${parseFloat(movie.price).toFixed(2)}`}
                </p>
              </div>
            </div>

          </div>
          <div className="column is-3">
            <div className="field">
              <div className="control">
                <div className="select">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={this.state.quantity}
                    onChange={(ev) => this.setState({ quantity: ev.target.value })}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ margin: '10px' }}
              className="button is-link"
              onClick={() => addToCart(movie.id, quantity)}
            >
              Add To Cart
            </button>
            <button type="submit" style={{ margin: '10px' }} className="button is-link">Add to Wishlist</button>

          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(SingleMovieBox);
