import React, { useState, useEffect } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PASS_REGEX =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
const REGISTER_URL = "/register";

function Register() {
  const google = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/google", "_self");
  };

  const github = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/github", "_self");
  };

  const twitter = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/twitter", "_self");
  };

  const emailRef = React.useRef();
  const errRef = React.useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASS_REGEX.test(password);
    setValidPassword(result);
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

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

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(password)) {
      return "Password must contain at least one Special Symbol.";
    }

    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(password)) {
      return "Password must be 10-16 Characters Long.";
    }
  }

  let navigate = useNavigate();

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
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response.data);
      // console.log(response.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);

      // clear input fields
      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Already Exists");
      } else {
        setErrMsg("Uh oh! Try Again Later");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/secrets")
      ) : (
        <div className="container mt-5 home">
          <h1>Sign Up</h1>
          <div className="row">
            <div className="col-sm-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      <label htmlFor="email">
                        Email
                        <span className={validEmail ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={validEmail || !email ? "hide" : "invalid"}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        name="email"
                        autoFocus
                        className="form-control"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="eidnote" //for descriptive text
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => {
                          setEmailFocus(false);
                        }}
                      />

                      <p
                        id="eidnote"
                        className={
                          emailFocus && email && !validEmail
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hypens allowed.
                      </p>
                    </div>

                    <div className="form-group">
                      <br />
                      <label htmlFor="password">
                        Password
                        <span className={validPassword ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={
                            validPassword || !password ? "hide" : "invalid"
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>

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
                      <p
                        id="pwdnote"
                        className={
                          passwordFocus && !validPassword
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        {checkPasswordValidation(password)}
                      </p>
                    </div>
                    <div className="form-group">
                      <br />
                      <label htmlFor="confirm_password">
                        Confirm Password
                        <span
                          className={
                            validMatch && matchPassword ? "valid" : "hide"
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={
                            validMatch || !matchPassword ? "hide" : "invalid"
                          }
                        >
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
                      <p
                        id="confirmnote"
                        className={
                          matchFocus && !validMatch
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                      </p>
                    </div>
                    <br />
                    <button
                      disabled={
                        !validEmail || !validPassword || !validMatch
                          ? true
                          : false
                      }
                      className="btn btn-dark"
                    >
                      Register
                    </button>
                    <p className="extraline">
                      Already registered?
                      <br />
                      <span className="line">
                        {/* put router link here */}
                        <Link to="/login">Sign In</Link>
                      </span>
                    </p>
                  </form>

                  <div className="container-fluid">
                    <div className="row">
                      <div className="center">
                        <hr className="orline" />
                        <div className="or">OR</div>
                      </div>

                      <div className="col-sm-9">
                        <button
                          className="btn-google"
                          alt="google"
                          onClick={google}
                        >
                          <FcGoogle size={25} style={{ marginRight: "17px" }} />
                          Sign Up with Google
                        </button>
                      </div>

                      <div className="col-sm-9">
                        <button
                          className="btn-facebook"
                          alt="facebook"
                          onClick={twitter}
                        >
                          <AiOutlineTwitter
                            size={25}
                            style={{ color:'#2192FF', marginRight: "17px" }}
                          />
                          Sign Up with Twitter
                        </button>
                      </div>

                      <div className="col-sm-9">
                        <button
                          className="btn-github"
                          alt="github"
                          onClick={github}
                        >
                          <AiFillGithub
                            size={25}
                            style={{ color: "#000", marginRight: "17px" }}
                          />
                          Sign Up with Github
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
