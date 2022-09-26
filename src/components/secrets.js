import React, {useEffect} from "react";
import axios from "axios";


function Secrets(){

  // useEffect(() => {
  //   axios.get("http://localhost:3000/auth/")
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err.message));
  // });

  return (
    <div className="jumbotron text-center home">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">You've Discovered My Secret!</h1>

        <p className="secret-text"></p>
        <hr/>

        <a className="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>
        <a className="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>
      </div>
    </div>
  )
}

export default Secrets;
