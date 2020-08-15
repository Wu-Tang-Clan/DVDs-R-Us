/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Alert from 'react-s-alert';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import path from 'path';
import {
  getCartItems, removeFromCart, editCartQuantity, getActiveCartItems, checkoutCart,
} from '../redux/cart/actions';
import { orderParser } from '../utilities';
import { getMovies } from '../redux/movies/actions';
import store from '../redux/store';

const PUBLISHING_KEY = 'pk_test_51HC5PPIpeeFTP4XBYprFZCBhZtuaovgYyM6HCY5dOyE3vcBClKdyIEgX6SBockJfgs8tOzndrOW5u3PWJOGCiPzb00wcaRWANw';

class Cart extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    const {
      getCartItems, getMovies, getActiveCartItems, checkoutCart,
    } = this.props;
    await getMovies();
    await getActiveCartItems();
  }

  handleToken = async (token) => {
    const { props: { history } } = this.props;
    const { checkoutCart, getActiveCartItems, orders } = this.props;
    // eslint-disable-next-line prefer-destructuring
    const total = store.getState().cartReducer.total;
    const response = await axios.post('/api/cart/checkout', {
      token,
      total,
      orders,
    });
    if (response.data === 'OK') {
      Alert.success('WHAM! Check your AOL acct for your itemized receipt.', {
        effect: 'slide',
        timeout: 3000,
      });
      await checkoutCart();
      await getActiveCartItems();
      setTimeout(() => {
        history.push('/browse');
      }, 1500);
    } else {
      Alert.error('WOMP WOMP! Dude where\'s your car?! Better luck next time :)', {
        effect: 'slide',
        timeout: 3000,
      });
    }
  }

  async handleRemoveFromCart(movieId, cartId, title) {
    const { removeFromCart } = this.props;
    await removeFromCart(movieId, cartId, title);
  }

  async handleChangeInCartQuantity(movieId, cartId, quantity) {
    const { editCartQuantity } = this.props;
    await editCartQuantity(movieId, cartId, quantity);
  }

  render() {
    const { orders, total, movies } = this.props;
    const { handleToken } = this;
    const parsedOrders = orderParser(orders);
    const orderList = parsedOrders.map((order) => {
      const movie = movies.filter((movie) => movie.id === order.movieId);
      return (
        <div className="container" key={order.id}>
          <div className="card" style={{ backgroundColor: '#1030AD', height: '150px' }}>
            <div className="columns">
              <div className="column is one-fifth">
                <p className="title is-6">{movie[0].title}</p>
                <figure className="image is-48x48">
                  <img src={movie[0].poster} alt={movie[0].title} />
                </figure>
              </div>
              <div className="column is-one-fifth">
                <p className="subtitle is-6">{order.quantity}</p>
              </div>
              <div className="column is-one-fifth">
                <p className="subtitle is-6">
                  $
                  {((order.quantity * 99) / 100)}
                </p>
              </div>
              <div className="column is-one-fifth">
                <input
                  className="input"
                  style={{ width: '70px' }}
                  type="number"
                  min="1"
                  max={movie[0].stock}
                  value={order.quantity}
                  onChange={(ev) => this.handleChangeInCartQuantity(movie[0].id,
                    order.CartId, ev.target.value)}
                />
              </div>
              <div className="column is-one-fifth">
                <button
                  type="submit"
                  style={{ margin: '10px' }}
                  className="button brandButton"
                  onClick={
                        () => this.handleRemoveFromCart(
                          movie[0].id,
                          order.CartId,
                          movie[0].title,
                        )
                      }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div style={{ marginTop: '3.75rem' }}>
        {
          orders.length
            ? (
              <div>
                <div className="box" style={{ height: '500px', overflowY: 'scroll' }}>
                  <div className="container">
                    <div className="card" style={{ backgroundColor: '#1030AD', boxShadow: 'none' }}>
                      <div className="columns">
                        <div className="column is-one-fifth">
                          <p className="title is-5">Movie</p>
                        </div>
                        <div className="column is-one-fifth">
                          <p className="title is-5">Quantity</p>
                        </div>
                        <div className="column is-one-fifth">
                          <p className="title is-5">Price</p>
                        </div>
                        <div className="column is-one-fifth">
                          <p className="title is-5">Edit Quantity</p>
                        </div>
                        <div className="column is-one-fifth" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  {
          orderList
          }
                </div>
                <div className="box column is-one-fifth">
                  <p className="subtitle is-4">{`Your Total is $${total.toFixed(2)}`}</p>
                </div>
                <StripeCheckout
                  stripeKey={PUBLISHING_KEY}
                  amount={Number(total * 100)}
                  shippingAddress
                  billingAddress
                  token={handleToken}
                />
              </div>
            )
            : (
              <div>
                <div className="box">
                  <p className="title is-4">Nothing in your cart yet! Go buy some DVDs!</p>
                </div>
              </div>
            )
        }

      </div>
    );
  }
}

Cart.propTypes = {
  getCartItems: propTypes.func.isRequired,
  getActiveCartItems: propTypes.func.isRequired,
  getMovies: propTypes.func.isRequired,
  removeFromCart: propTypes.func.isRequired,
  editCartQuantity: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cartReducer.orders,
  total: state.cartReducer.total,
  movies: state.movieReducer.movies,
});

const mapDispatchToProps = {
  getCartItems, getMovies, removeFromCart, editCartQuantity, getActiveCartItems, checkoutCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
