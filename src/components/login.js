import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Secrets from "./secrets";
import axios from "axios";

/* HOW TO CONVERT CLASS COMPONENT TO FUNCTIONAL COMPONENT ==>
HELPFUL REF: https://stackoverflow.com/questions/69965343/convert-react-class-based-to-functional-component
*/

function Login(){
    const [user, setUser] = useState({
      email: "",
      password: ""
    });

    let navigate = useNavigate();

    const handleChange = (event) => {
      const {name, value} = event.target;
      setUser({
        ...user, [name] : value
      });
    }


function onSubmit(event){
  event.preventDefault();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }

  axios.post("http://localhost:5000/auth/login", user, headers, {
    validateStatus: function (status) {
        return status < 500;}
    })
    .then(res => console.log(res))

    setUser({
      email: "",
      password: ""
    });
   navigate("secrets")
  };

return (
    <div className="container mt-5 home">
      <h1>Login</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                  <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="form-control"
                  required
                  onChange={handleChange}
                  value={user.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    onChange={handleChange}
                    value={user.password}
                    />
                  </div>
                <button type="submit" onClick={onSubmit}
                className="btn btn-dark">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
