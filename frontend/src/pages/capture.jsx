import { useEffect, useRef, useState } from "react";
import './stylesheets/capture.css';

function Capture() {

    // Simple mobile detection
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     // Trigger file input on mobile devices
    //     document.getElementById('fileInput').click();
    // } else {
    //     alert('Camera capture is optimized for mobile devices.');
    // }

    const [previewImg, setPreviewImg] = useState('');

    const inputRef = useRef(null);
    console.log(inputRef)

    useEffect(() => {
        // Check if the input element exists and then click it programmatically
    if (inputRef.current) {
        inputRef.current.click();
      }
    }, []); // Empty dependency array means this runs once after the initial render

    const handleCapture = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
    
    
    // console.log(target.files);

    return (
        <>
        <div id="capturePage" class="page active">
        <input type="file" accept="image/*" capture="environment" id="fileInput"  ref={inputRef} onChange={handleCapture}/>
        </div>
        <div id="preview-wrapper">
            <div id="preview">
            <img src={previewImg} alt="Preview Image" style={{maxWidth: "100%", height: "auto"}}/>

            </div>
        </div>

        

        </>
    );
}

export default Capture;