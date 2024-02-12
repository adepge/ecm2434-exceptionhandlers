import React from "react";
import mapicon from "../assets/footer/map.svg";
import "./stylesheets/footer.css";

export default function Footer() {
  return (
    <footer>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={mapicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">map</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={mapicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">map</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={mapicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">map</div>
      </div>
      <div id="map" className="button">
        <div className="backdrop">
          <img src={mapicon} id="map-icon" alt="map-icon" />
        </div>
        <div className="footer-text">map</div>
      </div>
    </footer>
  );
}
