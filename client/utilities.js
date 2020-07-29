export const generateGenres = (movies) => {
    let genreArray = []
    movies.forEach(movie => {
        movie.genres.forEach(genre => {
            if (!genreArray.includes(genre)) {
                genreArray.push(genre);
            }
        })
    })
    return genreArray;
}

export const movieFilter = (movies, filter, sort) => {
    switch(filter) {
        case 'All':
            movies = movies;
            break;
        default:
            movies = movies.filter(movie => movie.genres.includes(filter));
    }
    switch(sort) {
        case 'A-Z':
            movies = movies.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
            break;
        case 'Z-A':
            movies = movies.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
            break;
        case 'Highest Rated':
            movies = movies.sort((a, b) => a.rating < b.rating ? 1 : -1);
            break;
        case 'Lowest Rated':
            movies = movies.sort((a, b) => a.rating > b.rating ? 1 : -1);
            break;
        case 'Released (Most Recent)':
            movies = movies.sort((a, b) => a.released < b.released ? 1 : -1);
            break;
        case 'Released (Oldest)':
            movies = movies.sort((a, b) => a.released > b.released ? 1: -1);
    }
    return movies;
}