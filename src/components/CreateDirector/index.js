import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

const mainurl = "https://moviesuggestionwebapi.azurewebsites.net/api/";
const TITLE = "Add Director";

class CreateDirector extends Component {
  constructor(props) {
    super(props);

    this.onChangeDirectorname = this.onChangeDirectorname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDirectorImg = this.onChangeDirectorImg.bind(this);
    this.onChangeBornIn = this.onChangeBornIn.bind(this);
    this.onChangeBornAt = this.onChangeBornAt.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      directorname: "",
      description: "",
      directorimg: "",
      bornIn: "",
      bornAt: new Date(),
    };
  }

  onChangeDirectorname(e) {
    this.setState({
      directorname: e.target.value,
    });
  }

  onChangeDirectorImg(e) {
    let file = e.target.files[0];

    this.setState({ directorimg: file });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeBornIn(e) {
    this.setState({
      bornIn: e.target.value,
    });
  }
  onChangeBornAt(e) {
    this.setState({
      bornAt: e,
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

    let token = this.props.token;
    let directorname = this.state.directorname;
    let description = this.state.description;
    let directorimg = this.state.directorimg;
    let bornIn = this.state.bornIn;
    let bornAt = this.formatDate(this.state.bornAt);
    let formdata = new FormData();

    formdata.append("name", directorname);
    formdata.append("description", description);
    formdata.append("portre", directorimg);
    formdata.append("bornIn", bornIn);
    formdata.append("bornAt", bornAt);

    console.log(formdata);

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
        this.setState({
          directorname: "",
          description: "",
          directorimg: "",
          bornAt: new Date(),
          bornIn: "",
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h3>Add new director</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Director Name: </label>
            <input
              required
              value={this.state.directorname}
              onChange={this.onChangeDirectorname}
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
              onChange={(e) => this.onChangeDirectorImg(e)}
            />
          </div>
          <div className="form-group">
            <label>Born at: </label>
            <div>
              <DatePicker
                selected={this.state.bornAt}
                onChange={this.onChangeBornAt}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Born in: </label>
            <input
              required
              value={this.state.bornIn}
              onChange={this.onChangeBornIn}
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
              value={this.state.description}
              onChange={this.onChangeDescription}
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
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};
export default connect(mapStateToProps)(CreateDirector);
