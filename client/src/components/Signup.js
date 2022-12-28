import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch('/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      })
    });

    const data = await res.json();

    if (res.status !== 200 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      history("/login");
    }
  };

  return (
    <>
      <section>
        <div className="signup">
          <div className="container mt-3">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Signup</h2>
                <form
                  method="POST"
                  className="registration-form"
                  id="registration-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name me-2"></i>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder="Your name"
                    />
                  </div>

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
                      value={user.email}
                      onChange={handleInputs}
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-phone-in-talk material-icons-name me-2"></i>
                      Phone
                    </label>
                    <input
                      type="phone"
                      name="phone"
                      className="form-control"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">
                      <i className="zmdi zmdi-slideshow material-icons-name me-2"></i>
                      Work
                    </label>
                    <input
                      type="text"
                      name="work"
                      className="form-control"
                      id="work"
                      autoComplete="off"
                      value={user.work}
                      onChange={handleInputs}
                      placeholder="Your Profession"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-lock material-icons-name me-2"></i>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-lock material-icons-name me-2"></i>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                      placeholder="Confirm your Password"
                    />
                  </div>

                  {/* <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button> */}

                  <div className="form-group form-button mt-3">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="btn btn-primary"
                      value="Register"
                      onClick={PostData}
                    ></input>
                  </div>
                </form>
                <div className="signup-lastline">
                  <NavLink to="/login" className="signup-lastline-link">
                    I am already register
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

export default Signup;
