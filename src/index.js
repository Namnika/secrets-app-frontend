import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./components/App";
import Login from "./components/login";
import Register from "./components/register";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <App /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
