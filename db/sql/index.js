const mysql = require('mysql');
const { mysqlConfig } = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = {
    saveMovie: ({ id, year, rating, name, photo_url }) => {
        return new Promise((resolve, reject) => {
            console.log("adding to favs" + [id, year, rating, name, photo_url])
            connection.query(`INSERT INTO favorites (id, year, rating, name, photo_url) VALUES(?, ?, ?, ?, ?)`,
                [id, year, rating, name, photo_url],
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