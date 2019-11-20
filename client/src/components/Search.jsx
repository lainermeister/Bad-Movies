import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selectedGenre: ""
    };
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }
  componentDidMount() {
    this.getGenres()
      .then(() => this.setState({ selectedGenre: this.state.genres[0].id }))
      .catch((err) => console.error(err));
  }

  getGenres() {
    return axios
      .get("/genres")
      .then(({ data }) => this.setState({ genres: data }));
  }

  onDropdownChange(e) {
    console.log(e.target.value);
    this.setState({ selectedGenre: e.target.value });
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />
        {this.props.showFaves ? (
          ""
        ) : (
          <div>
            <select
              onChange={this.onDropdownChange}
              value={this.state.selectedGenre}
            >
              {this.state.genres.map((genre) => {
                return (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <button
              onClick={() => this.props.onSearch(this.state.selectedGenre)}
            >
              Search
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
