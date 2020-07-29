import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../redux/movies/actions';

class MoviePage extends Component {
    
    state = {
        quantity: 0
    }

    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const { id } = this.props.props.match.params;
        const movie = this.props.movies.find(movie => movie.id === id);
        const { quantity } = this.state;
        const { history } = this.props.props;
        return (
            <div>
                <p className='backLink' onClick={() => history.goBack() }>Back</p>
                {
                    (movie) ?
                    <div className='box'>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p className='title is-3'>{ movie.title } ({ movie.year })</p>
                            <p className='title is-4'>Rating { movie.rating }</p>
                        </div>
                        <div className='columns'>
                            <div className='column is-one-third'>
                                <figure className='image is=4by5'>
                                    <img src={ movie.poster }/>
                                </figure>
                            </div>
                            <div className='column is-two-thirds'>
                                <p>"<i>{ movie.plot }</i>"</p>
                                    {
                                        (movie.director.length > 1) ?
                                        <p className='title is-6' style={{marginTop:'20px'}}>Directors: { movie.director.join(', ') }</p>
                                        :
                                        <p className='title is-6' style={{marginTop:'20px'}}>Director: { movie.director.join(', ') }</p>
                                    }
                                    {
                                        (movie.writer.length > 1) ?
                                        <p className='title is-6' style={{marginTop:'20px'}}>Writers: { movie.writer.join(', ') }</p>
                                        :
                                        <p className='title is-6' style={{marginTop:'20px'}}>Writer: { movie.writer.join(', ') }</p>
                                    }
                                <p className='title is-6' style={{marginTop: '20px'}}>Starring: { movie.actors.join(', ') }</p>
                                <p className='title is-6' style={{marginTop: '20px'}}>Runtime: { movie.runtime }</p>
                                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <input className='input' type='number' value={ quantity } onChange={(e)=> this.setState({quantity:e.target.value})}></input>
                                        <button style={{margin:'10px'}}className='button'>Add To Cart</button>
                                        <button style={{margin:'10px'}}className='button'>Add to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);