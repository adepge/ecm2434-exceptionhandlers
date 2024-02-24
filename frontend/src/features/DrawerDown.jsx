import { useState, useEffect, useRef } from "react";
import Polaroid from "./polaroid";
import handle from "../assets/map/handle.svg";

function DrawerDown({image, drawerVisible, setDrawerVisible}) {
  const elementRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  },[]);

  const handleClick = (event) => {
    // Check if the clicked element is outside the element
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setClosing(true);
      setTimeout(() => {
        setDrawerVisible(false);
        setClosing(false);
      }, 650);

    }
  };

  const drawerClass = closing ? "drawer-container" : "drawer-container drawer-exit-top";

  return (
    <>
      {drawerVisible &&
      <div className={drawerClass} ref={elementRef}>
        <div id="texture">
          <Polaroid id="collect-polaroid" src={image} rotation={-5} />
        </div>
        <button>Add to collection</button>
        <img id="handle" src={handle}></img>
      </div>}
    </>
  );
}
  
export default DrawerDown;
  