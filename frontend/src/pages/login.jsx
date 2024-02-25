import "./stylesheets/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const hansleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login/", userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
  };

  return (
    <div id="display">
      <div id="login-wrapper">
        <div id="login">
          {/* a spacer for the hader and footer  */}
          <div id="spacer">
            <div id="title">Login</div>
            <form onSubmit={hansleSubmit}>
              <div id="form">
                <input
                  name="username"
                  className="text"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                />
                <input
                  name="password"
                  className="text"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button>login</button>
                <div id="message">
                  Not a member?{" "}
                  <Link to={"/register"}>
                    <a>Sign Up</a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
