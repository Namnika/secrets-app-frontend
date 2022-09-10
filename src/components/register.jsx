import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";


function Register(){
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function submitUser(event){
    console.log(user);

    const data = qs.stringify({
      email: user.email,
      password: user.password
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    axios.post("http://localhost:5000/", data, headers)
    .then(res => console.log(res.data));

    setUser({
      email: "",
      password: ""
    });
    event.preventDefault();
  }





  // function addUser(newUser){
  //   setUsers(prevUsers => {
  //     return [...prevUsers, newUser];
  //   });
  // }

  useEffect(() => {
    axios.get("http://localhost:5000/register")
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  });


  return (
    <div className="container mt-5 home">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">

              <form action="/register" method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={user.email}
                  />

                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={user.password}
                  />

                </div>
                <button type="submit" onClick={submitUser} className="btn btn-dark">Register</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
