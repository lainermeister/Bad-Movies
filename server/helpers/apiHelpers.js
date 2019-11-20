const request = require('request');
const axios = require('axios');
const path = require('path');
const { api_key, api_url } = require('../../config.js');


module.exports = {
    getGenreList: () => {
        return axios.get(`${api_url}genre/movie/list?api_key=${api_key}`)
            .then(({ data }) => data.genres)

    },
    getMovieList: (genreId) => {
        genreId = genreId === "all" ? "" : genreId
        console.log(`${api_url}discover/movie?api_key=${api_key}&language=en-US&with_genres=${genreId}&sort_by=vote_average.asc&vote_count.gte=10`)
        return axios.get(`${api_url}discover/movie?api_key=${api_key}&language=en-US&with_genres=${genreId}&sort_by=vote_average.asc&vote_count.gte=10`)
            .then(({ data }) => module.exports._cleanMovieData(data.results))
    },

    _cleanMovieData: (movies) => {
        return movies.map((movie) => {
            return {
                photo_url: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path,
                id: movie.id,
                year: movie.release_date.slice(0, 4),
                rating: movie.vote_average,
                name: movie.original_title
            }
        })
    }
}