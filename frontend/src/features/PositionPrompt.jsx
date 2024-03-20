import './stylesheets/positionPrompt.css'
import Navation from '../assets/navigation.svg'
import { useState, useEffect } from 'react';

export default function PositionPrompt({ promptShown }) {

    const [show, setShowPrompt] = useState(false);

    onclick = () => {
        if (navigator.geolocation) {
            // promt the user to allow for location access
            navigator.geolocation.getCurrentPosition((position) => {
                // reload the page to get the new location
                // window.location.reload();
                promptShown();
            });
        }
    };

    useEffect(() => {
        async function check() {
            const permission = await navigator.permissions.query({ name: "geolocation" });
            if (permission.state === "granted") {
                setShowPrompt(false);
                promptShown();
            } else {
                setShowPrompt(true);
                promptShown();
            }
        }
        check();
    }, [navigator.permissions.query({ name: "geolocation" })])

    return (
        <>
            <div className="position-prompt" style={{ display: show ? "" : "none" }}>
            </div>
            <div className="position-prompt-content" style={{ display: show ? "" : "none" }}>
                <div className='prompt'>
                    <div className='icon'>
                        <img src={Navation} alt="navigation" />
                    </div>
                    <div className='title'>
                        Allow location access
                    </div>
                    <div>Location access is an integral part of the app. Please allow access to your location to continue.
                    </div>

                    <div className='guide'>Not working? <a href='https://support.google.com/chrome/answer/142065?hl=en-GB&co=GENIE.Platform%3DDesktop'>Troubleshooting guide</a></div>
                    <button onClick={onclick}>Allow Access</button>
                </div>
            </div >
        </>
    )
}

