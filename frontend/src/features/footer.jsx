import React from "react";
import mapicon from "../assets/footer/map.svg";
import feedicon from "../assets/footer/feed.svg";
import topicon from "../assets/footer/top.svg";
import captureicon from "../assets/footer/capture.svg";
import calendericon from "../assets/footer/calendar.svg";
import { useLocation } from "react-router-dom";

import "./stylesheets/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <footer>
      {/* map icon */}
      <div className="button">
        {/* send user to the map page on click */}
        <Link to="/">
          <div
            className="backdrop"
            style={{
              background: location.pathname === "/" ? "#00DCA5" : "none",
            }}
          >
            <img src={mapicon} id="map-icon" alt="map-icon" />
          </div>
          <div className="footer-text">map</div>
        </Link>
      </div>

      {/* top icon */}
      <div className="button">
        {/* send user to the top page on click */}
        <Link to="/challenge">
          {/* if the user is on the top page, add backdrop to the icon */}
          <div
            className="backdrop"
            style={{
              background: location.pathname === "/challenge" ? "#00DCA5" : "none",
            }}
          >
            <img src={calendericon} id="top-icon" alt="top-icon" />
          </div>
          <div className="footer-text">challenge</div>
        </Link>
      </div>

      {/* feed icon */}
      <div className="button">
        {/* send user to the feed page on click */}
        <Link to="/feed">
          <div
            className="backdrop"
            style={{
              background: location.pathname === "/feed" ? "#00DCA5" : "none",
            }}
          >
            <img src={feedicon} id="feed-icon" alt="feed-icon" />
          </div>
          <div className="footer-text">collection</div>
        </Link>
      </div>

      {/* capture icon */}
      <div className="button">
        {/* send user to the capture page on click */}
        <Link to="/capture">
          <div
            className="backdrop"
            style={{
              background: location.pathname === "/capture" ? "#00DCA5" : "none",
            }}
          >
            <img src={captureicon} id="capture-icon" alt="capture-icon" />
          </div>
          <div className="footer-text">capture</div>
        </Link>
      </div>
    </footer>
  );
}
