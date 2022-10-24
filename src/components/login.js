import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import axios from "../api/axios";
const LOGIN_URL = "/login";

function Login() {
  const google = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/google", "_self");
  };

  const github = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/github", "_self");
  };

  const twitter = () => {
    window.open("http://secrets-app-frontend.vercel.app/auth/twitter", "_self");
  };

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

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

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });
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
          <h1>Sign In</h1>
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
                        autoFocus
                        placeholder="Enter email"
                        autoComplete="off"
                        className="form-control"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="form-group">
                      <br />
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
                    <br />
                    <button className="btn btn-dark">Log In</button>

                    <p className="extraline">
                      Need an Account?
                      <br />
                      <span className="line">
                        {/* put router link here */}
                        <Link to="/register">Sign Up</Link>
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
                          Sign In with Google
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
                            style={{ color: "#2192FF", marginRight: "17px" }}
                          />
                          Sign In with Twitter
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
                          Sign In with Github
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

export default Login;
