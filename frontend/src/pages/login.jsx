import "./stylesheets/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function LoginPage() {
  const navigate = useNavigate();
  
  // the returned errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // the user details
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  // get text from the forms to the data
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // submit the form
  const hansleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/login/",
        userData
      );
      cookies.set("token", response.data.token, { path: "/" });
      navigate("/");
      return
    }
    catch (error) {
      // Display the error message from the server
      if (error.response) {
        if (error.response.data.username) {
          setErrors({
            ...errors,
            username: error.response.data.username,
          });
          return
        } else {
          console.log(error);
          alert("Internal server error. Please try again later.");
        }
      } else {
        console.log(errors);
        alert("Cannot connect to the server");
      }
    }


  }

  return (
    <div id="displayLogin">
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
                <button>Login</button>
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
