import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from '../hooks/useLogout';
import SecretPost from './secretPost';
import axios from 'axios';

function Secrets(){

	const navigate = useNavigate();
	const logout = useLogout();

	const signOut = async () => {
		await logout();
		navigate('/');
	};
	
	const [secrets, setSecrets] = useState([]);
    
   
	const submitSecret = (e) => {
        e.preventDefault()
		navigate('/submit')
	}
	

	return (
		<div className="jumbotron text-center home">
			<div className="container">
				<i className="fas fa-key fa-6x"></i>
				<h1 className="display-3">You've Discovered My Secret!</h1>
				<hr/>
                
                {secrets.map(() =>  
					<SecretPost text={secrets[0].text}/>
				)}
				

				<button className="btn btn-light btn-lg" onClick={signOut}>Log Out</button>


				<button 
				className="btn btn-dark btn-lg"
				onClick={submitSecret}
				>Submit a Secret</button>
			</div>
		</div>
	)
}

export default Secrets;
