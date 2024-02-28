import { useState, useEffect, useRef } from "react";
import { useCollectedPinStore } from "../stores/pinStore";
import Polaroid from "./polaroid";
import handle from "../assets/map/handle.svg";
import "../styles/drawer-down.css";

function DrawerDown({ id, image, drawerVisible, setDrawerVisible, handleSubmit }) {
  const elementRef = useRef(null);
  const [closing, setClosing] = useState(drawerVisible);
  const [collected, setCollected] = useState(false);

  const collectedPins = useCollectedPinStore((state) => state.pinIds);
  
  useEffect(() => {
    if (collectedPins.includes(id)) {
      setCollected(true);
    }
  }, [collectedPins, id]);

  useEffect(() => {
    if (drawerVisible) {
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 650);
    }
  }, [drawerVisible]);

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
              <div id="polariod-container">
                <Polaroid id="collect-polaroid" src={image} rotation={-5} />
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
