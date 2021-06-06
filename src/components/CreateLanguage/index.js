import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const mainurl = `${process.env.REACT_APP_API_URL}api/`;

const CreateLanguage = (props) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let token = props.token;

    let newLanguage = {
        name,
        code
    }

    axios({
      url: `${mainurl}languages/add`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: newLanguage,
    })
      .then((response) => {
        console.log(response.data);
        alert("Language is added succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <h3>Add new Language</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Language Name: </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="Turkish"
          />
          <small id="helpId" className="form-text text-muted">
            English, Turkish or Japanese
          </small>
        </div>
        <div className="form-group">
          <label>Language code: </label>
          <input
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="helpId"
            placeholder="tr"
          />
          <small id="helpId" className="form-text text-muted">
            For English, insert en. For Turkish, insert tr
          </small>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Add Language
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
export default connect(mapStateToProps)(CreateLanguage);
