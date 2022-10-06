import React, { useState, useEffect, useRef } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PASS_REGEX = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
const REGISTER_URL = "/register";

function Register() {

	const emailRef = React.useRef();
	const errRef = React.useRef();

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);


	useEffect(() => {
		emailRef.current?.focus();
	}, [])

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		console.log(result);
		console.log(email);
		setValidEmail(result);
	}, [email])

	useEffect(() => {
		const result = PASS_REGEX.test(password);
		console.log(result);
		console.log(password);
		setValidPassword(result);
		setValidMatch(password === matchPassword);
	}, [password, matchPassword])

	useEffect(() => {
		setErrMsg('');
	}, [email, password, matchPassword])


	// FOR STRONG PASSWORD
	function checkPasswordValidation(password) {
		const isWhitespace = /^(?=.*\s)/;
		if (isWhitespace.test(password)) {
			return "Password must not contain Whitespaces.";
		}

		const isContainsUppercase = /^(?=.*[A-Z])/;
		if (!isContainsUppercase.test(password)) {
			return "Password must have at least one Uppercase Character.";
		}

		const isContainsLowercase = /^(?=.*[a-z])/;
		if (!isContainsLowercase.test(password)) {
			return "Password must have at least one Lowercase Character.";
		}

		const isContainsNumber = /^(?=.*[0-9])/;
		if (!isContainsNumber.test(password)) {
			return "Password must contain at least one Digit.";
		}

		const isContainsSymbol =
			/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
		if (!isContainsSymbol.test(password)) {
			return "Password must contain at least one Special Symbol.";
		}

		const isValidLength = /^.{10,16}$/;
		if (!isValidLength.test(password)) {
			return "Password must be 10-16 Characters Long.";
		}
	}

	let navigate = useNavigate();
	


	/* [axios.post("http://localhost:5000/users/register", data, headers)] ==>>
			it is used for to post user's data to register page using "users/register".
	*/
	/* [navigate("/submit")] is to simply navigate or to locate components 
	
	/* FOR TEXT NODE COMMENTS IN REACT: PUT COMMENTS INSIDE BRACES INSTALL PLUGIN
	"eslint-plugin-react"
	*/

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled 
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PASS_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		
		try {
			const response = await axios.post(REGISTER_URL, 
				JSON.stringify({ email, password }), 
			{
				headers: {"Content-Type": "application/json"},
				withCredentials: true
			});
			console.log(response.data);
			console.log(response.accessToken);
			console.log(JSON.stringify(response));
			setSuccess(true);
			// clear input fields 
			setEmail("");
			setPassword("");
		}
		catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response')
			}else if(err.response?.status === 409){
				setErrMsg('Email Already Exists')
			}else {
				setErrMsg('Uh oh! Try Again Later')
			}
			errRef.current?.focus();
		}
	}




	return (
		<>
			{success ? (navigate("/secrets")) : (
				<div className="container mt-5 home">
					<h1>Register</h1>
					<div className="row">
						<div className="col-sm-8">
							<div className="card">
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										{/* don't use "action=''" & "method: POST" while using axios routing
								cause it's doing same thing.
								*/}
										<div className="form-group">
											<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
												aria-live="assertive">{errMsg}
											</p>
											<label htmlFor="email">Email
												<span className={validEmail ? "valid" : "hide"}>
													<FontAwesomeIcon icon={faCheck} />
												</span>
												<span className={validEmail || !email ? "hide" : "invalid"}>
													<FontAwesomeIcon icon={faTimes} />
												</span>
											</label>
											<input
												type="email"
												id="email"
												ref={emailRef}
												autoComplete="off"
												name="email"
												className="form-control"
												placeholder="Enter email"
												required
												onChange={(e) => setEmail(e.target.value)}
												aria-invalid={validEmail ? "false" : "true"}
												aria-describedby="eidnote" //for descriptive text
												onFocus={() => setEmailFocus(true)}
												onBlur={() => { setEmailFocus(false) }}

											// value={user}
											/>
											<p id="eidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
												<FontAwesomeIcon icon={faInfoCircle} />
												4 to 24 characters.<br />
												Must begin with a letter.<br />
												Letters, numbers, underscores, hypens allowed.
											</p>
										</div>
										<div className="form-group">
											<label htmlFor="password">Password
												<span className={validPassword ? "valid" : "hide"}>
													<FontAwesomeIcon icon={faCheck} />
												</span>
												<span className={validPassword || !password ? "hide" : "invalid"}>
													<FontAwesomeIcon icon={faTimes} />
												</span>
											</label>

											{/* [<label htmlFor="password" >] ==>> "htmlFor" is used in react
									instead of for in simple label in html*/}

											<input
												type="password"
												id="password"
												name="password"
												className="form-control"
												required
												aria-invalid={validPassword ? "false" : "true"}
												aria-describedby="pwdnote"
												placeholder="Enter password"
												onChange={(e) => setPassword(e.target.value)}
												onFocus={() => setPasswordFocus(true)}
												onBlur={() => setPasswordFocus(false)}

											/>

											{/* <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
										<FontAwesomeIcon icon={faInfoCircle} />
										8 to 24 characters. <br />
										Must include uppercase and lowercase letters, a number and a special character.<br />
										Allowed special characters: <span aria-label="exclamation mark">!</span>
										<span aria-label="at symbol">@</span>
										<span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>
										<span aria-label="percent">%</span>
									</p> */}

											<p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
												<FontAwesomeIcon icon={faInfoCircle} />
												{checkPasswordValidation(password)}
											</p>

										</div>
										<div className="form-group">
											<label htmlFor="confirm_password">Confirm Password
												<span className={validMatch && matchPassword ? "valid" : "hide"}>
													<FontAwesomeIcon icon={faCheck} />
												</span>
												<span className={validMatch || !matchPassword ? "hide" : "invalid"}>
													<FontAwesomeIcon icon={faTimes} />
												</span>
											</label>

											<input
												type="password"
												id="confirm_password"
												name="password"
												className="form-control"
												required
												aria-invalid={validMatch ? "false" : "true"}
												aria-describedby="confirmnote"
												placeholder="Confirm your password"
												onChange={(e) => setMatchPassword(e.target.value)}
												onFocus={() => setMatchFocus(true)}
												onBlur={() => setMatchFocus(true)}

											/>
											<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
												<FontAwesomeIcon icon={faInfoCircle} />
												Must match the first password input field.
											</p>

										</div>
										<button disabled={!validEmail || !validPassword || !validMatch ? true : false}
											className="btn btn-dark">Register</button>

										<p className="extraline">
											Already registered?<br />
											<span className="line">
												{/* put router link here */}
												<a href="./login">Log In</a>
											</span>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Register;
