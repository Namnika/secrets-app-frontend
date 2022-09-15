import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
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



  function handleSubmit(event){
    event.preventDefault();
    const userCheck = (user) => user.findOne(
      data.email === user.email && data.password === user.password
    );

  if(userCheck){

    setIsShown(true);
  }
  else{
    setIsShown(false);
  }
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
                  value={user.email}
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
                  value={user.password}
                  />

                </div>
                <button type="submit" onClick={handleSubmit}
                className="btn btn-dark">Login</button>

                {isShown && navigate("/submit")}

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
