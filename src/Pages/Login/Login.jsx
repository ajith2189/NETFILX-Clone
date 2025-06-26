import React from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

export default function Login() {
  const [singState, setSingState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (singState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return (
      loading? <div className="loading_spinner">
        <img src={netflix_spinner} alt="" />
      </div>:
      <div className="login">
        <img className="login-logo" src={logo} alt="" />
        <div className="login-form">
          <h1>{singState}</h1>
          <form action="">
            {singState === "Sign Up" ? (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <></>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={user_auth} type="submit">
              {singState}
            </button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help</p>
            </div>
          </form>
          <div className="form-switch">
            {singState === "Sign In" ? (
              <p>
                New to Netflix?{" "}
                <span onClick={() => setSingState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setSingState("Sign In")}>Sign In Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
  );
}
