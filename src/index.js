import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "./components/App";
import Login from "./components/login";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <App /> }/>
      <Route path="/login" element={ <Login /> }/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
