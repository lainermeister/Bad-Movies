DROP DATABASE IF EXISTS movies;
CREATE DATABASE movies;
USE movies;

CREATE TABLE favorites
(
    id INT(20) PRIMARY KEY,
    year INT(4),
    rating VARCHAR(4),
    name VARCHAR(100),
    photo_url VARCHAR(100)
);