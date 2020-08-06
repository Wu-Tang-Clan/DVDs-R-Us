/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCartItems } from '../redux/cart/actions';
import { orderParser } from '../utilities';

class Cart extends Component {
  async componentDidMount() {
    const { getCartItems } = this.props;
    await getCartItems();
  }

  render() {
    const { orders } = this.props;
    console.log('CURRENT ORDERS', orders);
    const parsedOrders = orderParser(orders);
    console.log('PARSED ORDERS', parsedOrders);
    return (
      <div>
        <h1>Hello Cart!</h1>
      </div>
    );
  }
}

Cart.propTypes = {
  getCartItems: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.cartReducer.orders,
});

const mapDispatchToProps = { getCartItems };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
