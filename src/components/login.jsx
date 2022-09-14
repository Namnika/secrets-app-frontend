import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function Login(){

  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [users, setUsers] = useState([]);



  const [data, setData] = useState({
    email: "",
    password: ""
  });



  function changeHandler(event){
    const {name, value} = event.target;

    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
    };


function handleSubmit(event){
    event.preventDefault();

    const userCheck = users.find(user =>
      (user.email === data.email && user.password === data.password));
    if (userCheck){
      setIsShown(true);
    }else {
      setIsShown(false);
    };

    // axios.post("http://localhost:5000/users/")
    // .then(res => console.log(res.data))


  };


return (
    <div className="container mt-5 home">
    <h1>Login</h1>

    <div className="row">
      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">


            <form onClick={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                type="email"
                className="form-control"
                name="email" required
                placeholder="Enter your email"
                value={data.username}
                onChange={changeHandler}
                />

              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                type="password"
                autoComplete="on"
                className="form-control"
                name="password" required
                placeholder="Enter your password"
                value={data.password}
                onChange={changeHandler}
                />

              </div>
              <button type="submit"  className="btn btn-dark">Login</button>
              // {isShown && navigate("/submit")}
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
};

export default Login;
