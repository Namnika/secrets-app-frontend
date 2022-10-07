import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

/* HOW TO CONVERT CLASS COMPONENT TO FUNCTIONAL COMPONENT ==>
HELPFUL REF: https://stackoverflow.com/questions/69965343/convert-react-class-based-to-functional-component
*/

function Login() {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      console.log(response?.data?.accessToken);
      console.log(response?.data?.roles);

      const accessToken = response?.data?.accessToken;

      setAuth({ email, accessToken }); //no set password, roles in setAuth because setAuth() content stores password for long time 
      setEmail("");
      setPassword("");
      setSuccess(true);


    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email and Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Hey, Login again!");
        res.sendStatus(401);
      }
    }
  };

  return (
    <>
      {success ? (
        navigate("/secrets")
      ) : (
        <div className="container mt-5 home">
          <h1>Login</h1>
          <div className="row">
            <div className="col-sm-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <p
                        ref={errRef}
                        className={errMsg ? "errMsg" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      

                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        placeholder="Enter email"
                        autoComplete="off"
                        className="form-control"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <button className="btn btn-dark">Log In</button>
                    <p className="extraline">
                      Need an Account?
                      <br />
                      <span className="line">
                        {/* put router link here */}
                        <a href="./register">Register</a>
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
  );
}

export default Login;
