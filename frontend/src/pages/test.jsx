import React, { Component } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import './stylesheets/test.css'
import { useState } from "react";
import CheckLogin from "../features/CheckLogin";

const cookies = new Cookies();

function test() {

  // CheckLogin();

  const token = cookies.get('token');

  console.log(token);

  const [form, setForm] = useState({
    "postid": 2
  })

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      // Update the API URL as per your configuration
      const response = await axios.get(
        "https://api.post-i-tivity.me/api/getUser/"
        ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${cookies.get('token')}`, // Assuming postData.username is the token
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
