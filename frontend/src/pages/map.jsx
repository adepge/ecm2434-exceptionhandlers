import {APIProvider, Map, AdvancedMarker, Marker, Pin, InfoWindow} from '@vis.gl/react-google-maps';
import {useState, useEffect} from 'react';
import {differenceInDays, format} from 'date-fns';
import './stylesheets/map.css';
import napoleon from '../assets/map/napoleon.svg'
import MoodPrompt from '../features/MoodPrompt';

// Placeholder imports
import image1 from '../assets/feed/image1.png'
import image2 from '../assets/feed/image2.png'
import image3 from '../assets/feed/image3.png'
import jay from '../assets/profiles/jay.png'
import adam from '../assets/profiles/adam.png'

function MapPage() {

  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [mood, setMood] = useState('unselected');

  // Local state, to be replaced with fetched data
  const [locations, setLocations] = useState([
    {id: 1, position: {lat: 50.735424, lng: -3.534504}, caption: "This is what I strive for", image: image1, date: '2024-02-15T16:53:21', open: false},
    {id: 2, position: {lat: 50.73515821650297, lng: -3.5374750416490075}, caption: "Caption 2", image: image2, date: '2024-02-14T15:23:02', open: false},
    {id: 3, position: {lat: 50.73570670084978, lng: -3.532460585178674}, caption: "Caption 3", image: image3, date: '2024-02-13T09:58:33', open: false},
    {id: 4, position: {lat: 50.736341371401544, lng: -3.5391262256961586}, caption: "Caption 4", image: image3, date: '2024-02-13T07:25:41', open: false},
  ])

  // Checks if mood has been set before, if not call mood prompt;
  useEffect(() => {
    if (sessionStorage.mood === undefined) {
      setShowMoodPrompt(true);
    } else {
      setMood(sessionStorage.mood);
    }
  },[])


  const handleOpen = (id) => {
    setLocations(locations.map(location => {
      if (location.id === id) {
        return {...location, open: !location.open}
      } else {
        return {...location, open: false}
      }
   }))}

  const handleMoodPrompt = (mood) => {
    setMood(mood);
    sessionStorage.mood = mood;
    setShowMoodPrompt(false);
  }

  const position = {lat: 50.735424, lng: -3.534504};

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className={showMoodPrompt ? "mapContainer background-blur" : "mapContainer"}>
        <Map
        defaultCenter={position}
        defaultZoom={17}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        >
          {locations.map((location) => {
            const opacityDiff = differenceInDays(new Date(), new Date(location.date)) * 0.142857
            const color = `rgb(0, 220, 165)`
            return (
            <>
              <AdvancedMarker key={location.id} position={location.position} onClick={() => handleOpen(location.id)}>
                <Pin
                  background={color}
                  borderColor={color}
                  glyphColor="white"
                  scale={0.8}
                ></Pin>
              </AdvancedMarker>
            </>
            )
          })}
        </Map>
        </div>
      </APIProvider>
      {showMoodPrompt && <MoodPrompt onClickFunction={handleMoodPrompt} />}
    </>
  );
}

export default MapPage;
