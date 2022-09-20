import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "../components/login";
import Home from '../components/home';
import Register from "../components/register";
import Submit from "../components/submit";
import Secrets from "../components/secrets";
import axios from "axios";



function App(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users/")
    .then(res => {
        setUsers(res.data);
    })
    .catch(err => {
        console.log(err);
    });
  });


  function addUser(newUser) {
    setUsers(prevUsers => {
      return [...prevUsers, newUser];
    });
  }


  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={users.map((user) =>
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

          <Route exact path="submit" element={<Submit />} />
          <Route exact path="secrets" element={<Secrets />} />
        </Routes>
      </div>
  );
};

export default App;
