import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [{ deway: "movies" }],
      favorites: [{ deway: "favorites" }],
      showFaves: false
    };
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.movieClickHandler = this.movieClickHandler.bind(this);
  }
  componentDidMount() {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(genreId) {
    genreId = genreId || "all";
    return axios
      .get(`/search?genreId=${genreId}`)
      .then(({ data }) => {
        this.setState({ movies: data });
      })
      .catch((err) => console.error(err));
  }

  getFavorites() {
    axios
      .get("/favorites")
      .then(({ data }) => this.setState({ favorites: data }))
      .catch((err) => console.error(err));
  }

  saveFavorite(movie) {
    return axios
      .post("/save", { movie: movie })
      .then(() => this.getFavorites());
  }

  deleteFavorite({ id }) {
    return axios
      .delete("/favorites", { data: { id: id } })
      .then(() => this.getFavorites());
  }

  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  movieClickHandler(movie) {
    if (this.state.showFaves) {
      this.deleteFavorite(movie);
    } else {
      this.saveFavorite(movie);
    }
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            onSearch={this.getMovies}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            onClick={this.movieClickHandler}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
