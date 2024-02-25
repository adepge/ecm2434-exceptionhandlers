import { useState, useEffect, useRef } from "react";
import Polaroid from "./polaroid";
import handle from "../assets/map/handle.svg";

function DrawerDown({ image, drawerVisible, setDrawerVisible }) {
  const elementRef = useRef(null);
  const [closing, setClosing] = useState(setDrawerVisible);

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
      {drawerVisible && (
        <div className={drawerClass} ref={elementRef}>
          <div id="texture">
            <div id="polariod-container">
              <Polaroid id="collect-polaroid" src={image} rotation={-5} />
            </div>
          </div>
          <button>Add to collection</button>
          <img id="handle" src={handle}></img>
        </div>
      )}
    </>
  );
}

export default DrawerDown;
