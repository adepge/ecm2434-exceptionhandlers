import {APIProvider, Map, AdvancedMarker, Marker, Pin, InfoWindow} from '@vis.gl/react-google-maps';
import {useState} from 'react';
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

  // Local state, to be replaced with fetched data
  const [locations, setLocations] = useState([
    {id: 1, position: {lat: 50.735424, lng: -3.534504}, tag: "Great Hall", image: image1, date: '2024-02-15T16:53:21', likes: 4, liked: false, profileImage: jay, open: false},
    {id: 2, position: {lat: 50.73515821650297, lng: -3.5374750416490075}, tag: "Forum Hill", image: image2, date: '2024-02-14T15:23:02', likes: 12, liked: false, profileImage: jay, open: false},
    {id: 3, position: {lat: 50.73570670084978, lng: -3.532460585178674}, tag: "Reed Hall", image: image3, date: '2024-02-13T09:58:33', likes: 7, liked: false, profileImage: adam, open: false},
    {id: 4, position: {lat: 50.736341371401544, lng: -3.5391262256961586}, tag: "Mardon Hill", image: image3, date: '2024-02-13T07:25:41', likes: 25, liked: false, profileImage: adam, open: false},
  ])

  const handleOpen = (id) => {
    setLocations(locations.map(location => {
      if (location.id === id) {
        return {...location, open: !location.open}
      } else {
        return {...location, open: false}
      }
   }))}

  const position = {lat: 50.735424, lng: -3.534504};

  return (
    <>
      {/* <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className="mapContainer">
        <Map
        defaultCenter={position}
        defaultZoom={17}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        >
          {locations.map((location) => {
            const opacityDiff = differenceInDays(new Date(), new Date(location.date)) * 0.142857
            const color = `rgb(0, 220, 165, ${1 - opacityDiff})`
            return (
            <>
              <AdvancedMarker key={location.id} position={location.position} onClick={() => handleOpen(location.id)}>
                <Pin
                  background={color}
                  borderColor={color}
                  glyphColor={color}
                  scale={1.4}
                ></Pin>
              </AdvancedMarker>
              {location.open && (<InfoWindow className="custom-marker" position={location.position}></InfoWindow>)}
            </>
            )
          })}
        </Map>
        </div>
      </APIProvider> */}
      <MoodPrompt />
    </>
  );
}

export default MapPage;
