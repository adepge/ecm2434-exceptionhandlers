import React, { Component } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import './stylesheets/test.css'
import { useState } from "react";

const cookies = new Cookies();

// axios.defaults.withCredentials = true;

function test() {

  const [form, setForm] = useState({
    "userid": 1,
    "postid": []
  })

  const token = cookies.get('token');

  console.log(token);


  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      // Update the API URL as per your configuration
      const response = await axios.post(
        "http://127.0.0.1:8000/api/postsusers/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`, // Assuming postData.username is the token
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  }


  return (
    <div className="test">
      <form onSubmit={handleSubmit}>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default test;
