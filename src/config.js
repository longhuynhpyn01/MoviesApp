// để có thể sử dụng ở nhiều nơi
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "1a3ad44c7b5be7265bf8ab1662cea0b8";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointPerson = "https://api.themoviedb.org/3/person";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
const tmdbEndpointGenre = "https://api.themoviedb.org/3/genre/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page = 1) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieGenre: () => `${tmdbEndpointGenre}/list?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieCategory: (id, category) =>
    `https://api.themoviedb.org/3/${category}/${id}?api_key=${apiKey}`,
  getAPIConfiguration: (type) =>
    `https://api.themoviedb.org/3/configuration/${type}?api_key=${apiKey}`,
  getMovieCertification: () =>
    `https://api.themoviedb.org/3/certification/movie/list?api_key=${apiKey}`,
  getPersonDetails: (castId) =>
    `${tmdbEndpointPerson}/${castId}?api_key=${apiKey}`,
  getPersonMeta: (castId, type) =>
    `${tmdbEndpointPerson}/${castId}/${type}?api_key=${apiKey}`,
};
