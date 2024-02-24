import "./stylesheets/register.css";
import { useState } from "react";
import axios from 'axios';



function RegisterPage() {

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("in");
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);
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
            <div id="form" onSubmit={handleSubmit}>
              <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <input
                className="text"
                type="password"
                placeholder="Confirm Password"
              />
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
