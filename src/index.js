import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./components/App";
import Login from "./components/login";
import Register from "./components/register";
import Submit from "./components/submit";
import Secrets from "./components/secrets";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={ <App /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
      <Route path="/submit" element={ <Submit /> } />
      <Route path="/secrets" element={ <Secrets /> } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
