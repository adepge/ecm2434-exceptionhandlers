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
                setShowPrompt(false);
            });
        }
    };

    useEffect(() => {
        async function check() {
            const permission = await navigator.permissions.query({ name: "geolocation" });
            // if the permission is granted, hide the prompt
            if (permission.state === "granted") {
                setShowPrompt(false);
                promptShown();
            } else {
                // use the geolocation API to check if the user has allowed location access
                navigator.geolocation.getCurrentPosition((position) => {
                    // if the user has allowed location access, hide the prompt
                    promptShown();
                    setShowPrompt(false);
                    // if the user has not allowed location access, show the prompt
                }, setShowPrompt(true));
            }
        }
        check();
    }, [navigator.permissions.query({ name: "geolocation" })])

    return (
        <div className="position-prompt" style={{ display: show ? "" : "none" }}>
            <div className="position-prompt-content">
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
            </div>
        </div>
    )
}

