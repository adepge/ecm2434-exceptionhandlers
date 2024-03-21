import logo from '../assets/logo-text.png'
import './stylesheets/InitMap.css'
import loadingtips from '../assets/loading/loadingtips.json'

// Component for the loading screen (for the map)
const InitMap = ({ progress }) => {
    const randomTip = loadingtips.loadTips[Math.floor(Math.random() * loadingtips.loadTips.length)]
    return ( 
        <div className={progress >= 100 ? "splash fade-out" : "splash"}>
            <img src={logo}></img>
            <div className="loading-bar">
                <div className="loading-bar-progress" style={{ width: `${progress > 100 ? 100 : progress}%` }} />
            </div>
            <div className="tips-wrapper">{randomTip}</div>
        </div>
     );
}
 
export default InitMap;