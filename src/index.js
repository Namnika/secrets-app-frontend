import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from "../src/views/components/App";
import Login from "../src/views/components/login";
import Register from "../src/views/components/register";
import Submit from "../src/views/components/submit";
import Secrets from "../src/views/components/secrets";

/* in package.json of front-end where backend must be connect to that server where
  we are receiving data using axios route : ex "http://localhost:5000/users/".
  this must be same [axios.get("http://localhost:5000/users/")] === ["proxy": "http://localhost:5000/users/"]
  in package.json.
*/

/* RENDERS ALL CREATED COMPONENTS TO "index.js"
  to run react app, another words "MAIN SRC OF FRONT-END"
*/

/* [import { BrowserRouter, Routes, Route} from 'react-router-dom';] ==>
  this is imported for rendering all created components.
*/

/* [ERROR: "You rendered descendant <Routes (or called `useRoutes()`) at "/"
  (under <Route path="/">) but the parent route path has no trailing "*". .....Please
  change the parent <Route path="/"> to <Route path="*">."]

  [<Route index path="/*"... ] ==>> is used for nested routes, from all to render index path.
  [<Route exact path="/login"...] ==>> is used to set exact path route or location
  to that component.
  [<React.StrictMode>] ==>> for REACT STRICT WARNING.

  Helpful Ref: https://stackoverflow.com/questions/70604020/please-change-the-parent-route-path-to-route-path
*/


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index path="/*" element={ <App /> }/>
      <Route exact path="/login" element={ <Login /> }/>
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/submit" element={ <Submit /> } />
      <Route exact path="/secrets" element={ <Secrets /> } />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById("root"));
