import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/*" element={<App />}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
