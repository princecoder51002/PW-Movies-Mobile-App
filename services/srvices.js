import axios from 'axios';
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=ad0bd5201dc5183c55b9868f2d3765b7';

// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
    return resp.data.results;
};

//Get Upcoming Movies
export const getUpComingMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return resp.data.results;
};

//Get Popular TV
export const getPopularTv = async () => {
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
    return resp.data.results;
};

//Get Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie/?${apiKey}&with_genres=10751`);
    return resp.data.results;
};

//Get Documentary 
export const getDocumentary = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie/?${apiKey}&with_genres=99`);
    return resp.data.results;
};

//Get Horror
export const getHorror = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie/?${apiKey}&with_genres=27`);
    return resp.data.results;
};

//Get Romance
export const getRomance = async () => {
    const resp = await axios.get(`${apiUrl}/discover/movie/?${apiKey}&with_genres=10749`);
    return resp.data.results;
};

//Get Movie Detail
export const getMovie = async (id) => {
    const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
    return resp.data;
};

//Search Movie Or Tv
export const searchMovieTv = async (query, type) => {
    const resp = await axios.get(`${apiUrl}/search/${type}/${id}?${apiKey}&query=${query}`);
    return resp.data.results;
};


  