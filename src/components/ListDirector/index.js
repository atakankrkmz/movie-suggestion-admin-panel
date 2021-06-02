import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const mainurl = "https://moviesuggestionwebapi.azurewebsites.net/api/";

const Director = (props) => (
  <tr>
    <th scope="row">{props.director.id}</th>
    <td>
      <img
        src={
          "https://moviesuggestionwebapi.azurewebsites.net/" +
          "uploads/directorcontent/posters/" +
          props.director.portre
        }
        alt="directorimg"
        width="100px"
        height="100px"
      />
    </td>
    <td>{props.director.name}</td>
    <td>{props.director.description.substring(0, 150) + "..."}</td>
    <td>
      <Link to={"/director/edit/" + props.director.id}>edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteDirector(props.director.id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class DirectorList extends Component {
  constructor(props) {
    super(props);

    this.deleteDirector = this.deleteDirector.bind(this);

    this.state = { directors: [] };
  }

  componentDidMount() {
    axios.get(`${mainurl}directors/getall`).then((response) => {
      this.setState({
        directors: response.data["data"],
      });
    });
  }

  deleteDirector(id) {
    let deletedUser = {
      Id: id,
    };
    axios({
      url: `${mainurl}directors/delete`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: deletedUser,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    this.setState({
      directors: this.state.directors.filter((el) => el._id !== id),
    });
  }

  directorList() {
    return this.state.directors.map((director) => {
      return (
        <Director
          director={director}
          deleteDirector={this.deleteDirector}
          key={director.id}
        ></Director>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Director</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{this.directorList()}</tbody>
        </table>
      </div>
    );
  }
}
