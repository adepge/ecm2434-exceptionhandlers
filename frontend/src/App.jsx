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
import Challenge from "./pages/challenge";
import EditProfile from "./pages/editProfile";
import ChangeIcon from "./pages/changeIcon";

function App() {

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
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/changeIcon" element={<ChangeIcon />} />

      </Routes>
      <Footer />
    </>
  );
}
export default App;
