import React from "react";
import {Link } from "react-router-dom";


function Home(){
  return(
    <div className="jumbotron centered home">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
        <Link role="button" className="btn btn-dark btn-lg" to="/login">Login</Link>

      </div>
    </div>)
};

export default Home;
