/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCartItems } from '../redux/cart/actions';
import { orderParser } from '../utilities';
import { getMovies } from '../redux/movies/actions';

class Cart extends Component {
  async componentDidMount() {
    const { getCartItems, getMovies } = this.props;

    await getMovies();
    await getCartItems();
  }

  render() {
    const { orders, total, movies } = this.props;
    console.log('movies ', movies);
    console.log('CURRENT ORDERS', orders);
    console.log('total-- ', total);
    const parsedOrders = orderParser(orders);
    console.log('PARSED ORDERS', parsedOrders);

    const orderList = parsedOrders.map((order) => {
      const movie = movies.filter((movie) => movie.id === order.movieId);
      console.log('single movie ', movie);
      return (
        <div className="container" key={order.id}>
          <div className="card">
            <div className="card-image" />
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={movie[0].poster} alt={movie[0].title} />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">Name</p>
                  <p className="subtitle is-6">{movie[0].title}</p>
                </div>
                <div className="media-content">
                  <p className="title is-4">Quantity</p>
                  <p className="subtitle is-6">{order.quantity}</p>
                </div>
                <div className="media-content">
                  <p className="title is-4">Price</p>
                  <p className="subtitle is-6">
                    {(order.quantity * movie[0].price).toFixed(2)}
                  </p>
                </div>
                <div className="media-content">
                  <p className="title is-4">Price</p>
                  <p className="subtitle is-6">
                    {(order.quantity * movie[0].price).toFixed(2)}
                  </p>
                </div>
                <div className="media-content">
                  <p className="title is-4" />

                  <p className="subtitle is-6">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={order.quantity}
                    />
                  </p>
                </div>

                <div className="media-content">
                  <p className="title is-4" />
                  <p className="subtitle is-6">
                    <button
                      type="submit"
                      style={{ margin: '10px' }}
                      className="button is-link"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1 className="is-size-2">My Shopping Cart</h1>
        <br />
        <div>{orderList}</div>
        <button
          type="submit"
          style={{ margin: '10px' }}
          className="button is-link"
        >
          Checkout
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  getCartItems: propTypes.func.isRequired,
  getMovies: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cartReducer.orders,
  total: state.cartReducer.total,
  movies: state.movieReducer.movies,
});

const mapDispatchToProps = { getCartItems, getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
