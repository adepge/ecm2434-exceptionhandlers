import "./stylesheets/register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";

import LoadingScreen from "../features/loadingScreen";

const cookies = new Cookies();

function RegisterPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkbox: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = () => {
    setUserData({
      ...userData,
      checkbox: !isChecked,
    });
    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // prevent the default form submission
    e.preventDefault();
    setIsLoading(true);
    // if the password and confirm password do not match, display an error message
    if (userData.password !== userData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }
    // if the checkbox is not checked, display an error message
    if (!userData.checkbox) {
      setErrors({
        ...errors,
        checkbox: "Please agree to the terms and conditions",
      });
      setIsLoading(false);
      return;
    }

    // if the password dose not meet the requirements, display an error message
    if (userData.password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long",
      });
      setIsLoading(false);
      return;
    }

    // remove all the error messages
    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkbox: "",
    });

    // submit the form data to the server
    try {
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/register/",
        userData
      );
      cookies.set("token", response.data.token, { path: "/" });
      navigate("/");
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error("Error data:", error.response.data);
        // Display the error message from the server
        if (error.response.data.username) {
          setErrors({
            ...errors,
            username: error.response.data.username,
          });
        }
        if (error.response.data.email) {
          setErrors({
            ...errors,
            email: error.response.data.email,
          });
        }
      } else {
        // The request was made but no response was received or other errors occurred
        console.error("Error:", error.message);
      }

      alert("An error occurred.")
      // remove the loading screen
      setIsLoading(false);
      return;
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <LoadingScreen active={isLoading} />
      <div id="displayRegister">
        <div id="register-wrapper">
          <div id="register">
            <div id="spacer">
              <div id="title">Registration</div>
              <div id="form">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      required
                      className="text input"
                    />
                    <label className="error">{errors.username}</label>
                  </div>
                  <div className="field">
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="text input"
                    />
                    <label className="error">{errors.email}</label>
                  </div>
                  <div className="field">
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="text input"
                    />
                    <label className="error">{errors.password}</label>
                  </div>
                  <div className="field">
                    <input
                      className="text input"
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      required
                    />
                    <label className="error">{errors.confirmPassword}</label>
                  </div>
                  <div className="field">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        onChange={handleCheckBoxChange}
                        checked={isChecked}
                      />
                      <span className="checkmark"></span>I agree to Postpal’s
                      Terms & Conditions and Privacy Policy
                      <br />
                    </label>
                    <label className="error">{errors.checkbox}</label>
                  </div>
                  <button type="submit">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
