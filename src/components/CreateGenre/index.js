import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const mainurl = `${process.env.REACT_APP_API_URL}api/`;

const CreateGenre = (props) => {
  const [genreName, setGenreName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let token = props.token;

    let newGenre = {
      genreName,
    };

    axios({
      url: `${mainurl}genres/add`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: newGenre,
    })
      .then((response) => {
        console.log(response.data);
        alert("Genre is added succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <h3>Add new Genre</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Genre Name: </label>
          <input
            required
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="Insert movie's genre"
          />
          <small id="helpId" className="form-text text-muted">
            Action, Comedy or Stand-up
          </small>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Add Genre
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
export default connect(mapStateToProps)(CreateGenre);
