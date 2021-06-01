import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const mainurl = "https://moviesuggestionwebapi.azurewebsites.net/api/";
const TITLE = "Add Director";

const CreateDirector = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portre, setPortre] = useState("");
  const [bornIn, setBornIn] = useState("");
  const [bornAt, setBornAt] = useState(new Date());

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let token = props.token;
    let formattedBornAt = formatDate(bornAt);
    let formdata = new FormData();

    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("portre", portre);
    formdata.append("bornIn", bornIn);
    formdata.append("bornAt", formattedBornAt);

    axios({
      url: `${mainurl}directors/add`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response.data);
        alert("Director is added succesfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h3>Add new director</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Director Name: </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            class="form-control"
            aria-describedby="helpId"
            placeholder="Tim Burton"
          />
          <small id="helpId" class="form-text text-muted">
            Insert the director's name
          </small>
        </div>
        <div className="form-group">
          <label className="form-label" for="customFile">
            Director Porte:{" "}
          </label>
          <input
            type="file"
            name="file"
            class="form-control"
            id="customFile"
            onChange={(e) => {
              let file = e.target.files[0];
              setPortre(file);
            }}
          />
        </div>
        <div className="form-group">
          <label>Born at: </label>
          <div>
            <DatePicker selected={bornAt} onChange={(e) => setBornAt(e)} />
          </div>
        </div>
        <div className="form-group">
          <label>Born in: </label>
          <input
            required
            value={bornIn}
            onChange={(e) => setBornIn(e.target.value)}
            type="text"
            class="form-control"
            aria-describedby="helpId"
            placeholder="Tim Burton"
          />
          <small id="helpId" class="form-text text-muted">
            Insert the director's born date
          </small>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            class="form-control"
            aria-describedby="helpId"
            placeholder="The director of movie which we first watched together"
          />
          <small id="helpId" class="form-text text-muted">
            About the director
          </small>
        </div>

        <div className="form-group">
          <button type="submit" class="btn btn-primary">
            Add Director
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
export default connect(mapStateToProps)(CreateDirector);
