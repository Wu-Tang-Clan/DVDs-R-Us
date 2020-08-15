/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class ReviewList extends Component {
  render() {
    const { reviews } = this.props;
    return (
      <div className="reviewBox">
        {
          reviews.map((review) => (
            <div key={review.id} className="box">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                  <p className="title is-6" style={{ marginRight: '5px' }}>{review.username}</p>
                  {
                    [...Array(review.rating)].map((i, idx) => <i style={{ marginLeft: '5px' }} key={idx} className="fa fa-star" />)
                  }
                </div>
                <div>
                  <p>{ review.review }</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

ReviewList.propTypes = {
  reviews: propTypes.arrayOf(propTypes.object).isRequired,
};
