import './stylesheets/positionPrompt.css'
import Navation from '../assets/navigation.svg'
import { useState, useEffect } from 'react';

export default function PositionPrompt({ setLocationGranted, setProgress, setAwaitUserPrompt }) {

    onclick = () => {
        if (navigator.geolocation) {
            // promt the user to allow for location access
            navigator.geolocation.getCurrentPosition((position) => {
                setLocationGranted(true);
                setAwaitUserPrompt("resolved");
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 7); // Sets cookie to expire in a week
                document.cookie = `locationGranted=true; expires=${expiryDate.toUTCString()}; path=/`;
                setProgress(oldProgress => oldProgress + 30);
            },              
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                  setLocationGranted(false);
                  setAwaitUserPrompt("prompted");
                }
            });
        }
    };

    return (
        <div className="position-prompt">
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