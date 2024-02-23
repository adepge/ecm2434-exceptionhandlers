import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./features/header";
import Footer from "./features/footer";

import MapPage from "./pages/map";
import FeedPage from "./pages/feed";
import Capture from "./pages/capture";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ServerError from "./pages/serverError";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ServerError />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
