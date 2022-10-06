import Reactm, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Login from "./login";
import Home from './home';
import Register from "./register";
import Submit from "./submit";
import Secrets from "./secrets";
import axios from "axios";

// THIS IS A REACT-ROUTER V6 APP

const App = () => {

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="login" element={<Login />} />
            <Route  path="register" element={<Register />} />
            <Route  path="submit" element={<Submit />} />
            <Route  path="secrets" element={<Secrets />} />
          </Routes>
        </div>
    </Router>
  );
};

export default App;
