import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App";
import { AuthProvider } from "./context/AuthProvider";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<App />}  />
      </Routes>
    </Router>
      
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
