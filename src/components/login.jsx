import React, { useEffect, useState } from "react";
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

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const changeHandler = (event) => {
    setData({...data,
      [event.target.name]: event.target.value
    });
  };

  const checkUser = () => {
    const userCheck = users.find(user =>
      (user.username === data.username && user.password === data.password));
    if (userCheck){
      navigate("/secrets")
    }else {
      console.log("Wrong password or username");
    }
    // console.log(data.username);

  };
  useEffect(() => {
    checkUser(users)
  }, [data.username, data.password])



  const handleSubmit = (e) => {
    e.preventDefault();
    const userCheck = users.find(user =>
      (user.username === data.username && user.password === data.password));
    if (userCheck){
      navigate("/secrets");
    }else {
      console.log("Wrong password or username");
    }

  }



  return (
    <div class="container mt-5 home">
    <h1>Login</h1>

    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">



              <div class="form-group">
                <label for="email">Email</label>

                <input
                type="email"
                class="form-control"
                name="username" required
                placeholder="Enter your email"
                value={data.username}
                onChange={changeHandler}/>

              </div>
              <div class="form-group">
                <label for="password">Password</label>

                <input
                type="password"
                class="form-control"
                name="password" required
                placeholder="Enter your password"
                value={data.password}
                onChange={changeHandler}/>

              </div>
              <button type="submit" onClick={handleSubmit} class="btn btn-dark">Login</button>


          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Login;
