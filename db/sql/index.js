const mysql = require('mysql');
const { mysqlConfig } = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = {
    saveMovie: ({ id, release_date, vote_average, original_title, poster_path }) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO favorites (id, year, rating, name, photo_url) VALUES(?, ?, ?, ?, ?)`, [
                id,
                release_date.slice(0, 4),
                vote_average,
                original_title,
                `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`
            ],
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data)
                    }
                })
        })
    },
    getFavorites: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM favorites`, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            })
        })
    },
    deleteMovie: (id) => {

    }
}