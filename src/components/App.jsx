import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import Login from "./login";
import Home from './home';


const App = () => {
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login/>} />
        </Routes>
      </div>
  );
};

export default App;
