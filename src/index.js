import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./components/App";
import Login from "./components/login";
import Register from "./components/register";
import Submit from "./components/submit";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    <Routes>
      <Route index path="*" element={ <App /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
      <Route path="/submit" element={ <Submit /> } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
