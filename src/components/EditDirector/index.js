import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

const mainurl = `${process.env.REACT_APP_API_URL}api/`;

class EditDirector extends Component {
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

  componentDidMount() {
    axios
      .get(`${mainurl}directors/getbyid?id=` + this.props.match.params.id)
      .then((response) => {
        this.setState({
          directorname: response.data["data"].name,
          bornAt: new Date(response.data["data"].bornAt),
          bornIn: response.data["data"].bornIn,
          description: response.data["data"].description,
          directorimg: response.data["data"].poster,
        });
      })
      .catch((err) => console.log(err));
  }

  onChangeDirectorname(e) {
    this.setState({
      directorname: e.target.value,
    });
  }
  onChangeBornAt(e) {
    this.setState({
      bornAt: e,
    });
  }
  onChangeBornIn(e) {
    this.setState({
      bornIn: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDirectorImg(e) {
    let file = e.target.files[0];

    this.setState({ directorimg: file });
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
    let id = this.props.match.params.id;
    let directorname = this.state.directorname;
    let bornAt = this.formatDate(this.state.bornAt);
    let bornIn = this.state.bornIn;
    let description = this.state.description;
    let directorimg = this.state.directorimg;
    let formdata = new FormData();

    formdata.append("id", id);
    formdata.append("name", directorname);
    formdata.append("description", description);
    formdata.append("bornAt", bornAt);
    formdata.append("bornIn", bornIn);
    formdata.append("portre", directorimg);

    axios({
      url: `${mainurl}directors/update`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then((response) => {
        console.log(response.data);
        alert("Director is updated succesfully");
        this.setState({
          directorname: "",
          description: "",
          directorimg: "",
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  render() {
    return (
      <div>
        <h3>Edit "{this.state.directorname}"</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Director: </label>
            <input
              value={this.state.directorname}
              onChange={this.onChangeDirectorname}
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder="Big Fish"
            />
            <small id="helpId" class="form-text text-muted">
              Insert the director's name
            </small>
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
            <label className="form-label" for="customFile">
              Default file input example
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
              About the director
            </small>
          </div>
          <div className="form-group">
            <button type="submit" class="btn btn-primary">
              Update Director
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

export default connect(mapStateToProps)(EditDirector);
