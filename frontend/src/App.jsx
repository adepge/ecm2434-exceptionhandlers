import { Routes, Route } from "react-router-dom";
import Header from "./features/header";
import Footer from "./features/footer";

import MapPage from "./pages/map";
import FeedPage from "./pages/feed";
import Capture from "./pages/capture";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import PageNoFound from "./pages/pageNoFound";
import ProfilePage from "./pages/profilepage";
import Test from "./pages/test";

import axios from "axios";
import Cookies from "universal-cookie";

import { useState } from "react";


import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  // get the user token
  const cookies = new Cookies();

  const token = cookies.get("token");


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("token", token);
    // get all the post from database
    const getUser = async () => {
      try {
        let response = await axios.post("http://127.0.0.1:8000/api/getUser/", {}, {
          headers: {
            "Authorization": `Token ${token + ""}`, // Assuming postData.username is the token
          },
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    getUser();
  }, [cookies.get("token")]);

  return (
    <>
      <Header />
      <Routes>

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />


        <Route path="/" element={<MapPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<PageNoFound />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
