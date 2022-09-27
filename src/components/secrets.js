import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Secrets(){
  let navigate = useNavigate();

  const onSubmit = () => {
    axios.post("http://localhost:3000/auth/logout", {}, {withCredentials: true})
    .then(res => console.log(res))
    navigate("/")
  }

  return (
    <div className="jumbotron text-center home">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">You've Discovered My Secret!</h1>

        <p className="secret-text"></p>
        <hr/>

        <button className="btn btn-light btn-lg" onClick={onSubmit} type="submit">Log Out</button>
        <button className="btn btn-dark btn-lg" type="submit">Submit a Secret</button>
      </div>
    </div>
  )
}

export default Secrets;
