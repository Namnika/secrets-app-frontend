import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "./login";
import Home from './home';
import Register from "./register";
import Submit from "./submit";
import Secrets from "./secrets";
import axios from "axios";



function App(){
  const [users, setUsers] = useState([]);

  function addUser(newUser) {
    setUsers(prevUsers => {
      return [...prevUsers, newUser];
    });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/users/register")
    .then(res => {
        setUsers(res.data);
    })
    .catch(err => {
        console.log(err);
    });
  });


  return (

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={users.map((user) =>
            {
              return(
                <Register
                key={user._id}
                _id={user._id}
                email={user.email}
                password={user.password}
                onAdd={addUser} /> )}
              )
            } />

          <Route path="submit" element={<Submit />} />
          <Route path="secrets" element={<Secrets />} />
        </Routes>
      </div>
  );
};

export default App;
