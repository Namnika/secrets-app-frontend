import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import SecretPost from "./secretPost";
import axios from "../api/axios";
const SECRET_URL = "/secrets";

function Secrets() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const [secrets, setSecrets] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get(SECRET_URL);
        setSecrets(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          setFetchError(err.response.data);
        } else {
          console.log(`'Error': ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchSecrets())();
    }, 2000);
  }, []);

  const submitSecret = (e) => {
    e.preventDefault();
    navigate("/submit");
  };

  return (
    <div className="jumbotron text-center home">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">You've Discovered My Secret!</h1>
        <hr />

        {isLoading && <p>Loading Secrets...</p>}
        {fetchError && (
          <p
            style={{ color: "grey", fontWeight: "bold", fontSize: "1.2rem" }}
          >{`Error: ${fetchError}`}</p>
        )}

        {!fetchError &&
          !isLoading &&
          secrets.map((t) => (
            <SecretPost
              key={t._id}
              id={t._id}
              post={t.secret}
              className="secret-text"
            />
          ))}

        <button className="btn btn-light btn-lg" onClick={signOut}>
          Log Out
        </button>
        <button className="btn btn-dark btn-lg" onClick={submitSecret}>
          Submit a Secret
        </button>
      </div>
    </div>
  );
}

export default Secrets;
