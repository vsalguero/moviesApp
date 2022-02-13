import axios from 'axios';
import {URL, API_KEY} from '../config.js';

export const fetchMovies = async movies => {
  //get the most popular movies
  const response = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
  return [...movies, ...response.data.results];
};

export const fetchMoviesSearch = async search => {
  //if exists a search
  const response = await axios.get(
    `${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search}`,
  );
  return [...response.data.results];
};
