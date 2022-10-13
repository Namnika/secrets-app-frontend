import React, { useState, useEffect } from "react";
import AddSecret from './AddSecret';
import { useNavigate } from 'react-router-dom';
import apiRequest from "./apiRequest";

function Submit(){
	const API_URL = 'http://localhost:5500/secrets';

	const navigate = useNavigate();
	const [inputText, setInputText] = useState('');
	const [secrets, setSecrets] = useState([{}]);


	const addSecret = async (text) => {
        const id = secrets.length ? secrets[secrets.length - 1].id + 1 : 1;
		const newSecret = { id, text };
		const listSecret = [...secrets, newSecret];
		setSecrets(listSecret);
		localStorage.setItem('secretsList', JSON.stringify(listSecret));

		const postOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newSecret)
		}
		const result = await apiRequest(API_URL, postOptions);
		if (result) setFetchError(result);
	}

	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputText) return;
		addSecret(inputText);
		setInputText('');
		navigate('/secrets')
	}
	
	return (
		<div className="container">
			<div className="jumbotron centered">
				<i className="fas fa-key fa-6x"></i>
				<h1 className="display-3">Secrets</h1>
				<p className="secret-text">Don't keep your secrets, share them anonymously!</p>
			
				<AddSecret 
				inputText={inputText} 
				setInputText={setInputText}
				handleSubmit={handleSubmit}
				/>
				
			</div>
		</div>
	)
}

export default Submit;
