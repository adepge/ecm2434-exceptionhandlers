import "./stylesheets/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function LoginPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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

  const hansleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        userData
      );
      console.log(response.data);
      cookies.set("token", response.data.token, { path: "/" });
      navigate("/");
    }
    catch (error) {
      // Display the error message from the server
      if (error.response) {
        if (error.response.data.username) {
          setErrors({
            ...errors,
            username: error.response.data.username,
          });
        } else {
          console.log(error);
        }
      }
    }
    console.log(errors);
  }

  return (
    <div id="display">
      <div id="login-wrapper">
        <div id="login">
          {/* a spacer for the hader and footer  */}
          <div id="spacer">
            <div id="title">Login</div>
            <form onSubmit={hansleSubmit}>
              <div id="form">
                <div className="field">
                  <input
                    name="username"
                    className="text"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  <label className="error">{errors.username}</label>
                </div>
                <div className="field">
                  <input
                    name="password"
                    className="text"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <label className="error">{errors.username}</label>
                </div>
                <button>login</button>
                <div id="message">
                  Not a member?{" "}
                  <Link to={"/register"}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
}

export default LoginPage;
