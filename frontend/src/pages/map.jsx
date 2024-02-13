import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './stylesheets/map.css';

function MapPage() {
  const position = {lat: 50.735424, lng: -3.534504};

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="mapContainer">
      <Map
      defaultCenter={position}
      defaultZoom={17}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
      </div>
    </APIProvider>
  );
}

export default MapPage;
