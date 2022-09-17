import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

/* HOW TO CONVERT CLASS COMPONENT TO FUNCTIONAL COMPONENT ==>
HELPFUL REF: https://stackoverflow.com/questions/69965343/convert-react-class-based-to-functional-component
*/

function Login(){
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  // const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setState({
      [name]: value}
    );
  };

  function handleSubmit(event){
    event.preventDefault();

    axios({
      method: "POST",
      data: state,
      withCredentials: true,
      url: "http://localhost:5000/users/login",
    }).then((res) => console.log(res));

    console.log("Login Successfully!");
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
                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  required
                  onChange={handleChange}
                  value={state.email}
                  />

                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>

                  <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={state.password}
                  />

                </div>
                <button type="submit" onClick={handleSubmit}
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
