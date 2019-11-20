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
  }

  getMovies(genreId) {
    genreId = genreId || "all";
    return axios
      .get(`/search?genreId=${genreId}`)
      .then(({ data }) => this.setState({ movies: data }))
      .catch((err) => console.error(err));
  }

  saveMovie(movie) {
    return axios
      .post("/save", { movie: movie })
      .then(() => axios.get("/favorites"))
      .then(({ data }) => this.setState({ favorites: data }));
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  movieClickHandler(movie) {
    console.log("clicked");
    if (this.state.showFaves) {
    } else {
      this.saveMovie(movie);
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
