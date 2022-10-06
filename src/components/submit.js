import React, { useEffect } from "react";
import axios from "axios";

function Submit(){

  useEffect(() => {
    axios.get("http://localhost:3000/submit")
    .then(res => console.log(res.data))

  });


// post submit secrets using axios port : 5000 /auth/submit authentication first

  return (
    <div className="container">
      <div className="jumbotron centered">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="secret-text">Don't keep your secrets, share them anonymously!</p>

        <form>

          <div className="form-group">
            <input type="text" className="form-control text-center" name="secret" placeholder="What's your secret?" />
          </div>
          <button className="btn btn-dark" type="submit" to="/secrets">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Submit;
