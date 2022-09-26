import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App";
import * as serviceWorker from './serviceWorker';

/*

// *****------BABEL AND WEBPACKAGES PACKAGES NEEDS TO INSTALL in CLIENT NOT IN SERVER--------*****
/* ***** FOR SSR(SERVER SIDE RENDERING) TO RENDER REACT COMPONENT TO HTML babel packages needs to install in client not in server*****
 ****** FOR REACT SERVER COMPONENT TO MAKE HIERACHICAL FILES FOR CLIENT AND USER
 *******WITH EXTENSIONS "filename.client.js" for client "filename.server.js" for user.


 [ERROR: "You rendered descendant <Routes (or called `useRoutes()`) at "/"
  (under <Route path="/">) but the parent route path has no trailing "*". .....Please
  change the parent <Route path="/"> to <Route path="*">."]

  [<Route index path="/*"... ] ==>> is used for nested routes, from all to render index path.
  [<Route exact path="/login"...] ==>> is used to set exact path route or location
  to that component.
  [<React.StrictMode>] ==>> for REACT STRICT WARNING.

  Helpful Ref: https://stackoverflow.com/questions/70604020/please-change-the-parent-route-path-to-route-path


*/

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
