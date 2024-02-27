import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useState, useEffect, useMemo } from "react";
import { differenceInDays, format, set } from "date-fns";
import { PathLayer } from "@deck.gl/layers";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import "./stylesheets/map.css";
import napoleon from "../assets/map/napoleon.svg";
import MoodPrompt from "../features/MoodPrompt";
import DrawerDown from "../features/DrawerDown";
import Location from "../assets/location.svg";

import axios from "axios";
import InitMap from "../features/InitMap";
import Geolocation from "../features/Geolocation";


// Debugging options
const seeAllPins = true;
const spoofLocation = false;

// Placeholder imports
const image1 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297022160978/1000016508.JPG?ex=65dfdc7d&is=65cd677d&hm=295b9625886c4e12ea212d291878bb71d37e22a31d71e5757546d0a4a0a1bdb4&";
const image2 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297961943050/1000015958.JPG?ex=65dfdc7e&is=65cd677e&hm=6413142376bf1efe664ef897cd70325b1f5f2d03e9d177ab4b9c541a5fb1de59&";
const image3 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497298116874311/1000016354.JPG?ex=65dfdc7e&is=65cd677e&hm=e497673ab0de533871fc5fb4bb6e702ce4fbaa856f99461dc3abf555c6f0d510&";

// Overlay constructor component (from deck.gl documentation)
export const DeckGlOverlay = ({ layers }) => {
  const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), []);

  const map = useMap();
  useEffect(() => deck.setMap(map), [map]);
  useEffect(() => deck.setProps({ layers }), [layers]);

  return null;
};

// get all the post from database 
const getPosts = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/posts/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

getPosts().then((data) => console.log(data));

function MapPage() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);

  // State for mood prompt
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [mood, setMood] = useState("unselected");

  // State for drawer
  const [drawerTopVisible, setDrawerTopVisible] = useState(false);
  const [drawerImage, setDrawerImage] = useState(image1);

  // State for walking and tracking path coordinates and map position
  const [path, setPath] = useState([]);
  const [walking, setWalking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [position, setPosition] = useState({ lat: undefined, lng: undefined });
  const [locationTag, setLocationTag] = useState("Finding location...");

  // Local state, to be replaced with fetched data
  const [locations, setLocations] = useState([
    {
      id: 1,
      position: { lat: 50.735224, lng: -3.536504 },
      caption: "This is what I strive for",
      image: image1,
      date: "2024-02-15T16:53:21",
      open: false,
    },
    {
      id: 2,
      position: { lat: 50.73515821650297, lng: -3.5374750416490075 },
      caption: "Caption 2",
      image: image2,
      date: "2024-02-14T15:23:02",
      open: false,
    },
    {
      id: 3,
      position: { lat: 50.73570670084978, lng: -3.532460585178674 },
      caption: "Caption 3",
      image: image3,
      date: "2024-02-13T09:58:33",
      open: false,
    },
    {
      id: 4,
      position: { lat: 50.73788280412368, lng: -3.530794042942085 },
      caption: "Caption 4",
      image: image3,
      date: "2024-02-13T07:25:41",
      open: false,
    },
    {
      id: 5,
      position: { lat: 50.736341371401544, lng: -3.5391262256961586 },
      caption: "Caption 4",
      image: image3,
      date: "2024-02-13T07:25:41",
      open: false,
    },
    {
      id: 6,
      position: { lat: 50.738038832528616, lng: -3.5306508139149866 },
      caption: "Caption 4",
      image: image3,
      date: "2024-02-13T07:25:41",
      open: false,
    },
    {
      id: 7,
      position: { lat: 50.73782485058377, lng: -3.530022719410907 },
      caption: "Caption 4",
      image: image3,
      date: "2024-02-13T07:25:41",
      open: false,
    },
  ]);

  // Sample data for path layer (to be replaced as well)
  const path2 = [
    {
      path: [
        [-3.532736, 50.733763],
        [-3.532653, 50.733856],
        [-3.532582, 50.734025],
        [-3.532538, 50.734098],
        [-3.532489, 50.734238],
        [-3.532412, 50.734407],
        [-3.532396, 50.734417],
        [-3.532224, 50.734756],
        [-3.532171, 50.734879],
        [-3.531977, 50.735076],
        [-3.531859, 50.735137],
        [-3.531945, 50.735259],
        [-3.532063, 50.735374],
        [-3.532138, 50.735442],
        [-3.532407, 50.735619],
        [-3.532825, 50.735802],
        [-3.532825, 50.735802],
        [-3.533136, 50.735856],
        [-3.533415, 50.73585],
      ],
    },
  ];

  // Layer constructor for path layer (from deck.gl documentation)
  const layer = new PathLayer({
    id: "path-layer",
    data: path,
    getPath: (d) => d.path,
    getColor: [73, 146, 255],
    getWidth: 7,
    widthMinPixels: 2,
  });

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setLoading(false);
      }, 2550);
    }
  }, [progress]);

  // Checks if mood has been set before, if not call mood prompt;
  useEffect(() => {
    setProgress(20);
    new Promise((resolve, reject) => {
      if (sessionStorage.mood === undefined) {
        setShowMoodPrompt(true);
      } else {
        setMood(sessionStorage.mood);
      }
      setProgress(oldProgress => oldProgress + 30);
      resolve();
    })
      .then(() => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          });
        }
        setProgress(oldProgress => oldProgress + 50);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && walking) {
      const watchId = navigator.geolocation.watchPosition((position) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        setPath((currentPath) => [...currentPath, [position.coords.longitude, position.coords.latitude]]);
        setWatchId(watchId);
      });
    } else if (!walking) {
      navigator.geolocation.clearWatch(watchId);
    }
  }, [walking]);

  useEffect(() => {
    if (position.lat && position.lng) {
      Geolocation(position.lat, position.lng, setLocationTag)
    }
  }, [position]);

  // Filter pins based on radial distance calculated using the Haversine formula
  const filterPins = (lat, lng) => {
    const radius = 0.0005; // Radius of tolerance (about 35m from the position)

    const closeLocations = locations.filter((location) => {
      const dLat = deg2rad(location.position.lat - lat);
      const dLng = deg2rad(location.position.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(location.position.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = c * 6371.1; // Distance of the Earth's radius (km)

      return distance < radius;
    });
    return seeAllPins ? locations : closeLocations;
  }

  // Converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const handleOpen = (e, id) => {
    // prevent the user from clicking into the outsite area and the map icon
    e.domEvent.preventDefault();

    setLocations(
      locations.map((location) => {
        if (location.id === id) {
          setDrawerTopVisible(true);
          setDrawerImage(location.image);
          return { ...location, open: !location.open };
        } else {
          return { ...location, open: false };
        }
      })
    );
  };

  const handleMoodPrompt = (mood) => {
    setMood(mood);
    sessionStorage.mood = mood;
    setShowMoodPrompt(false);
  };

  return (
    <>
      {loading && <InitMap progress={progress} />}
      <DrawerDown
        image={drawerImage}
        drawerVisible={drawerTopVisible}
        setDrawerVisible={setDrawerTopVisible}
      />
      {(position.lat && position.lng) && <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div
          className={
            showMoodPrompt ? "mapContainer background-blur" : "mapContainer"
          }
        >
          <Map
            id="map"
            defaultCenter={position}
            defaultZoom={17}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
          >
            <DeckGlOverlay layers={layer} />
            <AdvancedMarker key="current-position" position={position}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "#4185f5",
                  border: "2px solid #ffffff",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </AdvancedMarker>
            {filterPins(position.lat, position.lng).map((location) => {
              const color = `var(--${mood})`;
              return (
                <>
                  <AdvancedMarker
                    key={location.id}
                    position={location.position}
                    onClick={(e) => handleOpen(e, location.id)}
                  >
                    <Pin
                      background={color}
                      borderColor={color}
                      glyphColor="white"
                      scale={0.8}
                    ></Pin>
                  </AdvancedMarker>
                </>
              );
            })}
          </Map>
        </div>
      </APIProvider>}
      {showMoodPrompt && <MoodPrompt onClickFunction={handleMoodPrompt} />}
      <div className="bottom-prompt">
        <div className="bottom-prompt-wrapper">
          <img src={Location} />{locationTag}
        </div>
      </div>
    </>
  );
}

export default MapPage;
