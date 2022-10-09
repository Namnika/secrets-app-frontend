import React, { useState } from "react";
import axios from "axios";
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

function Submit(props){
  const navigate = useNavigate();

  const [inputText, setInputText] = useState({
    text: ""
  });

  const handleChange = (e) => {
    e.preventDefault();

    const {name, value} = e.target;
    setInputText((prevValue) => {
      return {
        ...prevValue, 
        [name]: value
      };
    });
  }
 
  const handleSubmit = async (e) => {
      const secret = qs.stringify({
        text: ""
      });

      await axios.post('/secrets', secret, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      .then(res => console.log(res.data))
      navigate('/secrets')
      
      setInputText({text: ""})
      e.preventDefault();
  }

  
  return (
    <div className="container">
      <div className="jumbotron centered">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="secret-text">Don't keep your secrets, share them anonymously!</p>
        <form>
          <div className="form-group">
            <input 
            type="text"
            className="form-control text-center" 
            name="text"
            onChange={handleChange}
            placeholder="What's your secret?" 
            value={inputText.text}
            />
          </div>
          <button 
          className="btn btn-dark" 
          type="submit"
          onClick={handleSubmit}>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default Submit;
