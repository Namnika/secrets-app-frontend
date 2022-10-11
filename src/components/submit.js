import React, { useState, useEffect } from "react";
import AddSecret from './AddSecret';
import { useNavigate } from 'react-router-dom';

function Submit(){
	const navigate = useNavigate();
	const [inputText, setInputText] = useState('');

	const [secrets, setSecrets] = useState(JSON.parse(localStorage.getItem('secretsList')) ||  []);

	useEffect(() => {
		setSecrets(secrets)
	}, [])

	const addSecret = (text) => {
        const id = secrets.length ? secrets[secrets.length - 1].id + 1 : 1;
		const newSecret = { id, text };
		const listSecret = [...secrets, newSecret];
		setSecrets(listSecret);
		localStorage.setItem('secretsList', JSON.stringify(listSecret));
	}
 
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputText) return;
		addSecret(inputText);
		setInputText('');
		console.log('text entered')
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
				handleSubmit={handleSubmit}/>
				
			</div>
		</div>
	)
}

export default Submit;
