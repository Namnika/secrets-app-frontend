import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./login";
import Home from './home';
import Register from "./register";
import Submit from "./submit";
import Secrets from "./secrets";


const App = () => {
  return (
    <Router>
      <div className="App">
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/submit">
            <Submit />
          </Route>
          <Route exact path="/secrets">
            <Secrets />
          </Route>
      </div>
    </Router>
  );
};

export default App;
