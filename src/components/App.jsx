import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./login";
import Home from './home';
import Register from "./register";
import Submit from "./submit";
import Secrets from "./secrets";


const App = () => {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route exact path="login" element={<Login />}>
          </Route>
          <Route exact path="register" element={<Register />}>
          </Route>
          <Route exact path="submit" element={<Submit />}>
          </Route>
          <Route exact path="secrets" element={<Secrets />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
