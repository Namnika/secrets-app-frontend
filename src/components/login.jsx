import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){
  const users = [
    {
      username: "admin1",
      password: "123"
    },
    {
      username: 'admin2',
      password: '789'
    }
  ]

  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (event) => {
    setData({...data,
      [event.target.name]: event.target.value
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    const userCheck = users.find(user =>
      (user.username === data.username && user.password === data.password));
    if (userCheck){
      setIsShown(true);
    }else {
      setIsShown(false);
    }
  }



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
                name="username" required
                placeholder="Enter your email"
                value={data.username}
                onChange={changeHandler}/>

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
                onChange={changeHandler}/>

              </div>
              <button type="submit"  className="btn btn-dark">Login</button>
              {isShown && navigate("/submit")}
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Login;
