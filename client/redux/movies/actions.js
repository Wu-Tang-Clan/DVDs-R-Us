import {MOVIE_TYPES} from './types';
const axios = require('axios');

export const getMovies = () => async(dispatch) =>{
    await axios.get('/api/movies')
             .then(response => {
                 dispatch({
                     type:MOVIE_TYPES.GET_MOVIES,
                     movies:response.data
                 })
             })

}