import React, { useState } from "react";
import AddSecret from "./AddSecret";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
const SUBMIT_URL = "/submit";

function Submit() {
  const navigate = useNavigate();
  const [secrets, setSecrets] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSecret = { secret: inputText };
    try {
      const response = await axios.post(SUBMIT_URL, newSecret);
      const allSecrets = [...secrets, response.data];
      setSecrets(allSecrets);
      setInputText("");
      navigate("/secrets");
    } catch (err) {
      console.log(`'Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron centered">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="secret-text">
          Don't keep your secrets, share them anonymously!
        </p>

        <AddSecret
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Submit;
