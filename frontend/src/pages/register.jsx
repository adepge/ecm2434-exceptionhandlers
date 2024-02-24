import "./stylesheets/register.css";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
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
    // if the password and confirm password do not match, display an error message
    if (userData.password !== userData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }
    // if the checkbox is not checked, display an error message
    if (!userData.checkbox) {
      setErrors({
        ...errors,
        checkbox: "Please agree to the terms and conditions",
      });
      return;
    }

    // if the password dose not meet the requirements, display an error message
    if (userData.password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long",
      });
      return;
    }

    const { username, email, password } = userData;
    const dataToSend = { username, email, password };
    console.log(dataToSend);

    // submit the form data to the server
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        dataToSend
      );
      console.log(response.data);
      // Handle success (e.g., show message, redirect)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div id="display">
      <div id="register-wrapper">
        <div id="register">
          <div id="spacer">
            <div id="title">Register</div>
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
  );
}

export default RegisterPage;
