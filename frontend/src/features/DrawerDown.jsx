import { useState, useEffect, useRef } from "react";
import { useCollectedPinStore } from "../stores/pinStore";
import Polaroid from "./polaroid";
import handle from "../assets/map/handle.svg";
import "../styles/drawer-down.css";

// DrawerDown component - this component is used to display the drawer that appears when a pin is clicked on the map
function DrawerDown({ id, image, caption, drawerVisible, setDrawerVisible, handleSubmit, handleClickPolaroid }) {
  const elementRef = useRef(null);
  const [closing, setClosing] = useState(drawerVisible);
  const [collected, setCollected] = useState(false);

  const collectedPins = useCollectedPinStore((state) => state.pinIds);

  // Check if the pin is already collected
  useEffect(() => {
    if (collectedPins.includes(id)) {
      setCollected(true);
    }
  }, [collectedPins, id]);

  // Add event listener after 650 ms delay to prevent the drawer from closing immediately
  useEffect(() => {
    if (drawerVisible) {
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 650);
    }
  }, [drawerVisible]);

  // Handle click outside the drawer
  const handleClick = (event) => {
    // Check if the clicked element is outside the element
    
    event.preventDefault();

    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setClosing(true);
      document.removeEventListener("click", handleClick);
      setTimeout(() => {
        setDrawerVisible(false);
        setClosing(false);
      }, 650);
    }
  };

  const drawerClass = closing
    ? "drawer-container"
    : "drawer-container drawer-exit-top";

  return (
    <>
      <div className="drawer-wrapper">
        {drawerVisible && (
          <div className={drawerClass} ref={elementRef}>
            <div id="texture">
              <div id="polariod-container" onClick={handleClickPolaroid}>
                <Polaroid id="collect-polaroid" src={image} rotation={-5} caption={caption} />
              </div>
            </div>
            <button disabled={collected} onClick={handleSubmit}>{collected ? "Pin collected" : "Add to collection"}</button>
            <img id="handle" src={handle}></img>
          </div>
        )}
      </div>
    </>
  );
}

export default DrawerDown;
