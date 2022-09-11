import React, { useState, useEffect } from "react";

import axios from "axios";
import {Link } from "react-router-dom";

function App(){
  const [users, setUsers] = useState([]);

  function addUser(newUser) {
    setUsers(prevUsers => {
      return [...prevUsers, newUser];
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  });


  return (
    <div className="jumbotron centered home">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
        <Link role="button" className="btn btn-dark btn-lg" to="/login">Login</Link>

      </div>
    </div>
  );
};

export default App;
