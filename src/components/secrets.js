import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from '../hooks/useLogout';

function Secrets(props){
	const navigate = useNavigate();
	const logout = useLogout();

	const signOut = async () => {
		await logout();
		navigate('/');
	};
    
	// const handleSubmit = () => {
    //    props.onChecked(props.text);
	//    console.log(props);
	// }


	return (
		<div className="jumbotron text-center home">
			<div className="container">
				<i className="fas fa-key fa-6x"></i>
				<h1 className="display-3">You've Discovered My Secret!</h1>
				<p className="secret-text">{props.name}</p>
				<hr/>
				<button className="btn btn-light btn-lg" onClick={signOut}>Log Out</button>
				<button 
				className="btn btn-dark btn-lg"
				>Submit a Secret</button>
			</div>
		</div>
	)
}

export default Secrets;
