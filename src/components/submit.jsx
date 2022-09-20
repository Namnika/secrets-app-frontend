import React from "react";
import { Link } from "react-router-dom";

function Submit(){
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
          <Link className="btn btn-dark" type="submit" to="/secrets">Submit</Link>
        </form>
      </div>
    </div>
  )
}

export default Submit;
