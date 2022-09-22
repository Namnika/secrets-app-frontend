import React, {useEffect} from "react";
import axios from "axios";

function Secrets(){
  
  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then(res => console.log(res.json()))
    .then((result) => {
      console.log(result)
    }, (error) => {console.log(error)})
    
    .catch(err => console.log(err.message));
  });
  
  return (
    <div class="jumbotron text-center home">
      <div class="container">
        <i class="fas fa-key fa-6x"></i>
        <h1 class="display-3">You've Discovered My Secret!</h1>

        <p class="secret-text"></p>
        <hr/>

        <a class="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>
        <a class="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>
      </div>
    </div>
  )
}

export default Secrets;
