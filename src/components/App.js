import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Register from "./register";
import Submit from "./submit";
import Secrets from "./secrets";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

// THIS IS A REACT-ROUTER V6 APP

const App = () => {
  const [user, setUser] = useState("");
  const [isErr, setErr] = useState("");

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(LOGIN_URL, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("Authentication has been failed!");
        })
        .then((resObj) => {
          setUser(resObj.user);
        })
        .catch((err) => {
          setErr(err);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login user={user} />} />
          <Route path="register" element={<Register />} />
          <Route path="submit" element={<Submit />} />
          <Route path="secrets" element={<Secrets />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
