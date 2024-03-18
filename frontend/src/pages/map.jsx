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
import { usePositionStore, useGeoTagStore } from "../stores/geolocationStore";
import { usePinStore, useCollectedPinStore } from "../stores/pinStore";
import "./stylesheets/map.css";
import MoodPrompt from "../features/MoodPrompt";
import DrawerDown from "../features/DrawerDown";
import Location from "../assets/location.svg";
import axios from "axios";
import InitMap from "../features/InitMap";
import Geolocation from "../features/Geolocation";
import Cookies from "universal-cookie";
import PostView from "../features/PostView";
import CheckLogin from "../features/CheckLogin";
import question from "../assets/map/question.svg";

const cookies = new Cookies();

// Debugging options
const seeAllPins = false;
const spoofLocation = false;

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
    const response = await axios.get(
      "https://api.post-i-tivity.me/api/getRecentPosts/"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get collected posts from the database
const getCollectedPosts = async (token) => {
  try {
    const response = await axios.post(
      "https://api.post-i-tivity.me/api/collectedPosts/",
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

function MapPage() {

  // check if the user is logged in
  useEffect(() => {
    CheckLogin();
  }, []);

  // State for active post in the view
  const [activePost, setActive] = useState({});

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(20);

  // State for mood prompt
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [mood, setMood] = useState("unselected");

  // State for drawer
  const [drawerTopVisible, setDrawerTopVisible] = useState(false);
  const [drawerPost, setDrawerPost] = useState(null);

  // State for walking and tracking path coordinates and map position
  const [path, setPath] = useState([]);
  const [walking, setWalking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [lastPosition, setLastPosition] = useState({ lat: undefined, lng: undefined });

  // State for form data ( adding posts to collection )
  const [form, setForm] = useState({ "postid": 0 })

  // Global state for current position, location tag and pins
  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const locationTag = useGeoTagStore(state => state.geoTag);
  const setLocationTag = useGeoTagStore(state => state.setGeoTag);
  const pins = usePinStore(state => state.pins);
  const setPins = usePinStore(state => state.setPins);

  // Global state for collected pins
  const collectedPins = useCollectedPinStore(state => state.pinIds);
  const setCollectedPins = useCollectedPinStore(state => state.setPinIds);
  const addCollectedPin = useCollectedPinStore(state => state.addPinId);

  const token = cookies.get('token');

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

  useEffect(() => {
    new Promise((resolve, reject) => {
      // Get the user's current position
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          setPosition(position.coords.latitude, position.coords.longitude);
        });
      }
      setProgress(oldProgress => oldProgress + 30);
      resolve();
    })
      .then(() => {
        // Checks if mood has been set before, if not call mood prompt;
        if (sessionStorage.mood === undefined) {
          setShowMoodPrompt(true);
        } else {
          setMood(sessionStorage.mood);
        }
        setProgress(oldProgress => oldProgress + 30);
      })
      .then(() => {
        cookies.get('token');
        getCollectedPosts(token).then((data) => data.map((post) => addCollectedPin(post.id)));
        getPosts().then((data) => {
          setPins(data);
          setProgress(oldProgress => oldProgress + 20);
        });
      });
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation && walking) {
  //     const watchId = navigator.geolocation.watchPosition((position) => {
  //       setPosition(position.coords.latitude, position.coords.longitude);
  //       setPath((currentPath) => [...currentPath, [position.coords.longitude, position.coords.latitude]]);
  //       setWatchId(watchId);
  //     });
  //   } else if (!walking) {
  //     navigator.geolocation.clearWatch(watchId);
  //   }
  // }, [walking]);

  useEffect(() => {
    if (!(lastPosition.lat && lastPosition.lng) || Math.abs(lastPosition.lat - position.lat) > 0.001 || Math.abs(lastPosition.lng - position.lng) > 0.001) {
      Geolocation(position.lat, position.lng, setLocationTag);
      setLastPosition({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the API URL as per your configuration
      const response = await axios.post(
        "https://api.post-i-tivity.me/api/collectPost/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Token ${token}`, // Assuming postData.username is the token
          },
        }
      );
      addCollectedPin(form.postid);
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  // Filter pins based on radial distance calculated using the Haversine formula
  const filterPins = (lat, lng) => {
    const radius = 0.05; // Radius of tolerance (about 35m from the position)

    const closePins = pins.filter((pin) => {
      const dLat = deg2rad(pin.position.lat - lat);
      const dLng = deg2rad(pin.position.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(pin.position.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = c * 6371.1; // Distance of the Earth's radius (km)

      return distance < radius;
    });
    return seeAllPins ? pins : closePins;
  }

  const discoverPins = (lat, lng, filterPins) => {
    const minRadius = 0.05; // Minimum radius of discovery (about 35m from the position)
    const maxRadius = 0.25; // Maximum radius of discovery (about 175m from the position)
  
    const discoverPins = pins.filter((pin) => {
  
      const dLat = deg2rad(pin.position.lat - lat);
      const dLng = deg2rad(pin.position.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat)) * Math.cos(deg2rad(pin.position.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = c * 6371.1; // Distance of the Earth's radius (km)

      return distance > minRadius && distance < maxRadius;
    });
    return discoverPins;
  }


  // Converts degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const handleOpen = (e, id) => {
    // prevent the user from clicking into the outsite area and the map icon
    e.domEvent.preventDefault();

    setPins(
      pins.map((pin) => {
        if (pin.id === id) {
          setForm({ "postid": id })
          setDrawerTopVisible(true);
          setDrawerPost(pin);
          return { ...pin, open: !pin.open };
        } else {
          return { ...pin, open: false };
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
      {/* the absolute position post view */}
      <PostView
        isActive={Object.keys(activePost).length !== 0}
        image={activePost['image']}
        leaveFunction={() => {
          setActive({});
        }}
        caption={activePost["caption"]}
        // perform a null check or ensure that activePost["position"]["location"] exists before accessing its location property.
        location={activePost["position"] && activePost["position"]["location"]}
      />
      <div className={Object.keys(activePost).length !== 0 ? "blur" : ""} id="map-content">
        {loading && <InitMap progress={progress} />}
        <DrawerDown
          id={form.postid}
          image={drawerPost?.image}
          caption={drawerPost?.caption}
          drawerVisible={drawerTopVisible}
          setDrawerVisible={setDrawerTopVisible}
          handleSubmit={handleSubmit}
          handleClickPolaroid={() => setActive(pins.find((pin) => pin.id === form.postid))}
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
              {filterPins(position.lat, position.lng).map((pin) => {
                const color = `var(--${mood})`;
                return (
                  <AdvancedMarker
                    key={pin.id}
                    position={pin.position}
                    onClick={(e) => handleOpen(e, pin.id)}
                  >
                    <Pin
                      background={color}
                      borderColor={color}
                      glyphColor="white"
                      scale={0.8}
                    ></Pin>
                  </AdvancedMarker>
                );
              })}
              {discoverPins(position.lat, position.lng).map((pin) => {
                const color = `var(--${mood})`;
                return (
                  <AdvancedMarker
                    key={pin.id}
                    position={pin.position}
                  >
                    <img src={question}/>
                  </AdvancedMarker>
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
      </div>

    </>
  );
}

export default MapPage;