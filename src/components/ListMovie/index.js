import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const mainurl = "https://moviesuggestionwebapi.azurewebsites.net/api/";
const TITLE = "Movies";

const Movie = (props) => (
  <tr>
    <td>
      <img
        src={
          "https://moviesuggestionwebapi.azurewebsites.net/uploads/moviecontent/posters/" +
          props.movie.poster
        }
        alt="posterimg"
        width="100px"
        height="200px"
      />
    </td>
    <td>{props.movie.name}</td>
    <td>{props.movie.description.substring(0, 15)}</td>
    <td>{props.movie.directorId}</td>
    <td>{props.movie.genreId}</td>
    <td>{props.movie.poster}</td>
    <td>{props.movie.boxOffice}</td>
    <td>{props.movie.releaseDate.substring(0, 4)}</td>
    <td>
      <Link to={"/movie/edit/" + props.movie.id}>edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteMovie(props.movie.id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = { movies: [] };
  }

  componentDidMount() {
    axios.get(`${mainurl}movies/getall`).then((response) => {
      this.setState({
        movies: response.data,
      });
    });
  }

  deleteMovie(id) {
    axios.delete(`${mainurl}movies/delete`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      movies: this.state.movies.filter((el) => el.id !== id),
    });
  }

  movieList() {
    return this.state.movies.map((movie) => {
      return (
        <Movie
          movie={movie}
          deleteMovie={this.deleteMovie}
          key={movie.id}
        ></Movie>
      );
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Poster</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Director Id</th>
              <th scope="col">Genre Id</th>
              <th scope="col">Box Office</th>
              <th scope="col">Release Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.movieList()}</tbody>
        </table>
      </div>
    );
  }
}
