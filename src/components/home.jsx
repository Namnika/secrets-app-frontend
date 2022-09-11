
import React from "react";



function Home(){
  return (
    <div class="jumbotron centered home">
      <div class="container">
        <i class="fas fa-key fa-6x"></i>
        <h1 class="display-3">Secrets</h1>
        <p class="lead">Don't keep your secrets, share them anonymously!</p>
        <hr/>
        <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
        <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>

      </div>
    </div>
  )

}
export default Home;
