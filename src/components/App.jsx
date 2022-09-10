import React from "react";
import {Routes, Route} from 'react-router-dom';
import Login from "./login";
import Home from './home';
import Register from "./register";
import Submit from "./submit";



function App(){
  return (

      <div className="app">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="submit" element={<Submit />} />
        </Routes>
      </div>
  );
};

export default App;
