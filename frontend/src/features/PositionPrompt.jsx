import './stylesheets/positionPrompt.css'
import Navation from '../assets/navigation.svg'

export default function PositionPrompt({ show = false }) {

    onclick = () => {
        if (navigator.geolocation) {
            // promt the user to allow for location access
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position)
                window.location.reload();
                show = false
            });
        }
    };

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

