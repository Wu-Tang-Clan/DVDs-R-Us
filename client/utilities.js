/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

export const generateGenres = (movies) => {
  const genreArray = [];
  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      if (!genreArray.includes(genre)) {
        genreArray.push(genre);
      }
    });
  });
  return genreArray;
};

export const movieFilter = (movies, filter, sort) => {
  // let filteredMovies = movies;
  let filteredMovies = movies;
  switch (filter) {
    case 'All':
      filteredMovies = filteredMovies; // eslint-disable-line no-self-assign
      break;
    default:
      filteredMovies = filteredMovies.filter((movie) => movie.genres.includes(filter));
  }
  switch (sort) {
    case 'A-Z':
      filteredMovies = filteredMovies.sort((a, b) => (a.title.toLowerCase()
                                     > b.title.toLowerCase() ? 1 : -1));
      break;
    case 'Z-A':
      filteredMovies = filteredMovies.sort((a, b) => (a.title.toLowerCase()
                                     < b.title.toLowerCase() ? 1 : -1));
      break;
    case 'Highest Rated':
      filteredMovies = filteredMovies.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      break;
    case 'Lowest Rated':
      filteredMovies = filteredMovies.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      break;
    case 'Released (Most Recent)':
      filteredMovies = filteredMovies.sort((a, b) => (a.released < b.released ? 1 : -1));
      break;
    case 'Released (Oldest)':
      filteredMovies = filteredMovies.sort((a, b) => (a.released > b.released ? 1 : -1));
      break;
    default:
      filteredMovies = filteredMovies; // eslint-disable-line no-self-assign
  }
  return filteredMovies;
};

// eslint-disable-next-line consistent-return
export const searchMovieFilter = (movies, filter, sort, searchTerm) => {
  // let filteredMovies = movies;
  let filteredMovies = movies;
  if (searchTerm.length > 0) {
    switch (filter) {
      case 'All':
        filteredMovies = filteredMovies; // eslint-disable-line no-self-assign
        break;
      case 'title':
        filteredMovies = movies.filter((movie) => movie.title.toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'year':
        filteredMovies = movies.filter((movie) => movie.year.toString().includes(searchTerm));
        break;
      case 'director':
        filteredMovies = movies.filter((movie) => movie.director
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'actors':
        filteredMovies = movies.filter((movie) => movie.actors.toString().toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'awards':
        filteredMovies = movies.filter((movie) => movie.awards.toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'boxoffice':
        filteredMovies = movies.filter((movie) => movie.boxoffice.toString().includes(searchTerm));
        break;
      case 'metascore':
        filteredMovies = movies.filter((movie) => movie.metascore.toString().includes(searchTerm));
        break;
      case 'plot':
        filteredMovies = movies.filter((movie) => movie.plot.toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'rating':
        filteredMovies = movies.filter((movie) => movie.rating.toString().includes(searchTerm));
        break;
      case 'production':
        filteredMovies = movies.filter((movie) => movie.production.toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'runtime':
        filteredMovies = movies.filter((movie) => movie.runtime.toString().includes(searchTerm));
        break;
      case 'writer':
        filteredMovies = movies.filter((movie) => movie.writer.toString().toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      case 'released':
        filteredMovies = movies.filter((movie) => movie.released.toString().includes(searchTerm));
        break;
      case 'genres':
        filteredMovies = movies.filter((movie) => movie.genres.toString().toLowerCase()
          .includes(searchTerm.toLowerCase()));
        break;
      default:
        filteredMovies = filteredMovies.filter((movie) => movie.genres.includes(filter));
    }
    switch (sort) {
      case 'A-Z':
        filteredMovies = filteredMovies.sort((a, b) => (a.title.toLowerCase()
                                     > b.title.toLowerCase() ? 1 : -1));
        break;
      default:
        filteredMovies = filteredMovies; // eslint-disable-line no-self-assign
    }
    return filteredMovies;
  }
};

export const adminInventoryFilter = (movies, search) => {
  if (search.length > 0) {
    return movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
  }
  return movies;
};

export const orderParser = (orders) => {
  let parsed = [];
  parsed = orders.reduce((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i].movieId === b.movieId) {
        a[i].quantity += b.quantity;
        return a;
      }
    }
    a.push(b);
    return a;
  }, []);
  return parsed.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};
