import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import './stylesheets/test.css';

const cookies = new Cookies();

function Test() {
  const token = cookies.get('token');
  console.log(token);

  const [form, setForm] = useState({
    userId: '', // You need to capture the user ID somehow, adjust as necessary
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your API endpoint for POST request is /api/getUsername/
      // and it expects a payload with 'userId'
      const response = await axios.post(
        "http://127.0.0.1:8000/api/getUser/",
        { userId: form.userId }, // Sending the user ID in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        }
      );
      console.log(response.data); // Assuming response.data contains the username
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  // Update the state to capture the user ID from an input field
  const handleUserIdChange = (e) => {
    setForm({ ...form, userId: e.target.value });
  };

  return (
    <div className="test">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={form.userId}
          onChange={handleUserIdChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Test;
