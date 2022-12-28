import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status !== 200 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successfully");
      history("/");
    }
  };
  return (
    <>
      <section>
        <div className="signup">
          <div className="container mt-3">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign In</h2>
                <form
                  method="POST"
                  className="registration-form"
                  id="registration-form"
                >
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-name me-2"></i>
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      autoComplete="off"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small> */}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock material-icons-name me-2"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  {/* <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button> */}

                  <div className="form-group form-button mt-3">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="btn btn-primary"
                      value="Log in"
                      onClick={loginUser}
                    ></input>
                  </div>
                </form>
                <div className="signup-lastline">
                  <NavLink to="/signup" className="signup-lastline-link">
                    Create an account
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
