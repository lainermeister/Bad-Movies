const request = require('request');
const axios = require('axios');
const path = require('path');
const { api_key, api_url } = require('../../config.js');


module.exports = {
    getGenreList: () => {
        return axios.get(`${api_url}genre/movie/list?api_key=${api_key}`)
            .then(({ data }) => data.genres)

    },
    getMovieList: (genreID) => {
        return axios.get(`${api_url}discover/movie?api_key=${api_key}&language=en-US&with_genres=${genreID}&sort_by=vote_average.ascen&vote_count.gte=10`)
            .then(({ data }) => data.results)
    }
}