import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

/* HOW TO CONVERT CLASS COMPONENT TO FUNCTIONAL COMPONENT ==>
HELPFUL REF: https://stackoverflow.com/questions/69965343/convert-react-class-based-to-functional-component
*/

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

function onSubmit(event){
  event.preventDefault();
  // const headers = {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // }

  const userData = {
    email,
    password
  };
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
  });

  setEmail("");
  setPassword("");
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
                  placeholder="Enter email"
                  className="form-control"
                  required
                  onChange={e => {
                    setEmail(e.target.value);
                    console.log(email);
                  }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
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
