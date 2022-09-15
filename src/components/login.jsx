import React, { useState } from "react";



function Login(){

  const [user, setUsers] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  });


  function handleSubmit(event){
    event.preventDefault();
    const userCheck = (user) => users.findOne({
      data.email === user.email && data.password === user.password
    });

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
                  name="password"
                  required
                  onChange={handleChange}
                  value={user.password}
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
}

export default Login;
