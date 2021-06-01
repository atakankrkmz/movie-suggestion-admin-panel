import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const mainurl = "https://moviesuggestionwebapi.azurewebsites.net/api/";
const TITLE = "Add Movie";

class CreateMovie extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDirectorId = this.onChangeDirectorId.bind(this);
    this.onChangeGenreId = this.onChangeGenreId.bind(this);
    this.onChangePoster = this.onChangePoster.bind(this);
    this.onChangeBoxOffice = this.onChangeBoxOffice.bind(this);
    this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      directorId: 0,
      genreId: 0,
      poster: "",
      boxOffice: 0,
      releaseDate: new Date(),
      genres: [],
      directors: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${mainurl}directors/getall`)
      .then((response) => {
        if (response.data["data"].length > 0) {
          this.setState({
            directors: response.data["data"].map((director) => director),
            directorId: response.data.data[0].id,
          });
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${mainurl}genres/getall`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            genres: response.data.map((genre) => genre),
            genreId: response.data[0].id,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDirectorId(e) {
    this.setState({
      directorId: e.target.value,
    });
  }

  onChangeGenreId(e) {
    this.setState({
      genreId: e.target.value,
    });
  }

  onChangePoster(e) {
    let file = e.target.files[0];

    this.setState({ poster: file });
  }

  onChangeBoxOffice(e) {
    this.setState({
      boxOffice: e.target.value,
    });
  }

  onChangeReleaseDate(date) {
    this.setState({
      releaseDate: date,
    });
  }

  formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  onSubmit(e) {
    e.preventDefault();

    // const movie ={
    //     directorname: this.state.directorname,
    //     moviename: this.state.moviename,
    //     description: this.state.description,
    //     duration: this.state.duration,
    //     date: this.state.date
    // }

    let token = this.props.token;
    let name = this.state.name;
    let description = this.state.description;
    let directorId = this.state.directorId;
    let genreId = this.state.genreId;
    let poster = this.state.poster;
    let boxOffice = this.state.boxOffice;
    let releaseDate = this.formatDate(this.state.releaseDate);
    let formdata = new FormData();

    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("directorId", directorId);
    formdata.append("genreId", genreId);
    formdata.append("posterFile", poster);
    formdata.append("boxOffice", boxOffice);
    formdata.append("releaseDate", releaseDate);

    console.log(formdata);

    axios({
      url: `${mainurl}movies/add`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response.data);
        alert("Movie is added succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });

    // axios.post(`${mainurl}movie/add`, movie)
    // .then(response => {
    //     alert(response.data);

    //     console.log(response.data);
    // })
    // .catch(err => {
    //     console.log(err);
    //     alert('Something went wrong');
    // });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h3>Add new movie</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Movie Name: </label>
            <input
              value={this.state.name}
              onChange={this.onChangeName}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="Big Fish"
            />
            <small id="helpId" class="form-text text-muted">
              Insert the movie's name
            </small>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              value={this.state.description}
              onChange={this.onChangeDescription}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="The movie which is watched first together"
            />
            <small id="helpId" class="form-text text-muted">
              About the movie
            </small>
          </div>
          <div className="form-group">
            <label>Director Name: </label>
            <select
              ref="directorInput"
              required
              className="form-control"
              value={this.state.directorId}
              onChange={this.onChangeDirectorId}
            >
              {this.state.directors.map(function (director) {
                return (
                  <option key={director.id} value={director.id}>
                    {" "}
                    {director.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Genre: </label>
            <select
              ref="genreInput"
              required
              className="form-control"
              value={this.state.genreId}
              onChange={this.onChangeGenreId}
            >
              {this.state.genres.map(function (genre) {
                return (
                  <option key={genre.id} value={genre.id}>
                    {" "}
                    {genre.genreName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" for="customFile">
              Movie Poster:{" "}
            </label>
            <input
              type="file"
              name="file"
              class="form-control"
              id="customFile"
              onChange={(e) => this.onChangePoster(e)}
            />
          </div>

          <div className="form-group">
            <label>BoxOffice: </label>
            <input
              value={this.state.boxOffice}
              onChange={this.onChangeBoxOffice}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="125"
            />
            <small id="helpId" class="form-text text-muted">
              How much money did make the movie ?
            </small>
          </div>

          <div className="form-group">
            <label>Release Date: </label>
            <div>
              <DatePicker
                selected={this.state.releaseDate}
                onChange={this.onChangeReleaseDate}
              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" class="btn btn-primary">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(CreateMovie);
