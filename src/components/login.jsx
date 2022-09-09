import React, { useEffect, useState } from "react";

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









  return (
    <div class="container mt-5 home">
    <h1>Login</h1>

    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">



              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="username"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password"/>
              </div>
              <button type="submit" class="btn btn-dark">Login</button>


          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Login;
