import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";


function Register(){

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // const navigate = useNavigate();

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

    /* [axios.post("http://localhost:5000/users/register", data, headers)] ==>>
      it is used for to post user's data to register page using "users/register".
    */

    /* [navigate("/submit")] is to simply navigate or to locate components */

    axios
      .post("/api/auth/register", data, headers, {withCredentials: true})
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
        console.log(err.response);
      })
    // axios({
    //   method: "POST",
    //   data: data,
    //   headers: headers,
    //   withCredentials: true,
    //   url: "http://localhost:5000/register",
    // }).then(res => console.log(res));


    setUser({
      email: "",
      password: ""
    });

    event.preventDefault();
  };

/* FOR TEXT NODE COMMENTS IN REACT: PUT COMMENTS INSIDE BRACES INSTALL PLUGIN
 "eslint-plugin-react"
*/

  return (
    <div className="container mt-5 home">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">

              <form >
                {/* don't use "action=''" & "method: POST" while using axios routing
                cause it's doing same thing.
                */}


                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={user.email}
                  />

                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>


                  {/* [<label htmlFor="password" >] ==>> "htmlFor" is used in react
                  instead of for in simple label in html*/}


                  <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={user.password}
                  />

                </div>
                <button type="submit"
                className="btn btn-dark" onClick={submitUser}>Register</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
