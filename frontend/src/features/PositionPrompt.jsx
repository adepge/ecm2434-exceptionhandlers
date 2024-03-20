import './stylesheets/positionPrompt.css'
import Navation from '../assets/navigation.svg'
import { useState, useEffect } from 'react';

export default function PositionPrompt({ setLocationGranted }) {

    onclick = () => {
        if (navigator.geolocation) {
            // promt the user to allow for location access
            navigator.geolocation.getCurrentPosition((position) => {
                // reload the page to get the new location
                // window.location.reload();
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