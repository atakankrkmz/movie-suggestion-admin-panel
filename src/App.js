import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

/* Components */
import CreateDirector from "./components/CreateDirector";
import EditDirector from "./components/EditDirector";
import CreateMovie from "./components/CreateMovie";
import EditMovie from "./components/EditMovie";
import DirectorList from "./components/ListDirector";
import MovieList from "./components/ListMovie";
import LoginPage from "./components/Login";
import Navbar from "./components/UI/navbar.component";

const App = (props) => {
  let token = props.token;
  if (token) {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Redirect to="/" />
          <Route path="/" exact component={MovieList} />
          <Route path="/login" component={LoginPage} />
          <Route path="/movie/edit/:id" component={EditMovie} />
          <Route path="/movie/create" component={CreateMovie} />
          <Route path="/director" exact component={DirectorList} />
          <Route path="/director/create" component={CreateDirector} />
          <Route path="/director/edit/:id" component={EditDirector} />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Route path="/login" component={LoginPage} />
        <Redirect to="login" />
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(App);
