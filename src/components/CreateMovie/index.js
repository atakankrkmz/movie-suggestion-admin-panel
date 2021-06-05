import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";

const mainurl = `${process.env.REACT_APP_API_URL}api/`;

const CreateMovie = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directorId, setDirectorId] = useState(0);
  const [genreId, setGenreId] = useState(0);
  const [poster, setPoster] = useState("");
  const [boxOffice, setBoxOffice] = useState(0);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    axios
      .get(`${mainurl}directors/getall`)
      .then((response) => {
        if (response.data["data"].length > 0) {
          setDirectors(response.data["data"].map((director) => director));
          setDirectorId(response.data.data[0].id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${mainurl}genres/getall`)
      .then((response) => {
        if (response.data.length > 0) {
          setGenres(response.data.map((genre) => genre));
          setGenreId(response.data[0].id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let token = props.token;
    let formattedReleaseDate = formatDate(releaseDate);
    let formdata = new FormData();

    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("directorId", directorId);
    formdata.append("genreId", genreId);
    formdata.append("posterFile", poster);
    formdata.append("boxOffice", boxOffice);
    formdata.append("releaseDate", formattedReleaseDate);

    await axios({
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
  };

  return (
    <div>
      <h3>Add new movie</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Movie Name: </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="Big Fish"
          />
          <small id="helpId" className="form-text text-muted">
            Insert the movie's name
          </small>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="The movie which is watched first together"
          />
          <small id="helpId" className="form-text text-muted">
            About the movie
          </small>
        </div>
        <div className="form-group">
          <label>Director Name: </label>
          <select
            required
            className="form-control"
            value={directorId}
            onChange={(e) => setDirectorId(e.target.value)}
          >
            {directors.map(function (director) {
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
            required
            className="form-control"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
          >
            {genres.map(function (genre) {
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
          <label className="form-label" htmlFor="customFile">
            Movie Poster:{" "}
          </label>
          <input
            type="file"
            name="file"
            className="form-control"
            id="customFile"
            onChange={(e) => {
              let file = e.target.files[0];
              setPoster(file);
            }}
          />
        </div>

        <div className="form-group">
          <label>BoxOffice: </label>
          <input
            value={boxOffice}
            onChange={(e) => setBoxOffice(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="125"
          />
          <small id="helpId" className="form-text text-muted">
            How much money did make the movie ?
          </small>
        </div>

        <div className="form-group">
          <label>Release Date: </label>
          <div>
            <DatePicker
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(CreateMovie);
