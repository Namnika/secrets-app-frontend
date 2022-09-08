import React from "react";
import {BrowserRouter as Router, Link } from "react-router-dom";


function Home(){
  return(
    <div class="jumbotron centered home">
      <div class="container">
        <i class="fas fa-key fa-6x"></i>
        <h1 class="display-3">Secrets</h1>
        <p class="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />
        <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
        <Link role="button" className="btn btn-dark btn-lg" to="/login">Login</Link>

      </div>
    </div>)
};

export default Home;
