import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { useState, useEffect, useMemo } from "react";;
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { usePositionStore, useGeoTagStore } from "../stores/geolocationStore";
import { usePinStore, useCollectedPinStore } from "../stores/pinStore";
import "./stylesheets/map.css";
import DrawerDown from "../features/DrawerDown";
import axios from "axios";
import InitMap from "../features/InitMap";
import Cookies from "universal-cookie";
import PostView from "../features/PostView";
import CheckLogin from "../features/CheckLogin";
import question from "../assets/map/question.svg";

const cookies = new Cookies();

// Debugging options
const seeAllPins = false;

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

  // State for drawer
  const [drawerTopVisible, setDrawerTopVisible] = useState(false);
  const [drawerPost, setDrawerPost] = useState(null);

  // State for walking and tracking path coordinates and map position (feature has now been disabled)
  // const [path, setPath] = useState([]);
  // const [walking, setWalking] = useState(false);
  // const [watchId, setWatchId] = useState(null);

  // State for form data ( adding posts to collection )
  const [form, setForm] = useState({ "postid": 0 })

  // Global state for current position, location tag and pins
  const position = usePositionStore(state => state.position);
  const setPosition = usePositionStore(state => state.setPosition);
  const pins = usePinStore(state => state.pins);
  const setPins = usePinStore(state => state.setPins);

  // Global state for collected pins
  const collectedPins = useCollectedPinStore(state => state.pinIds);
  const addCollectedPin = useCollectedPinStore(state => state.addPinId);

  const token = cookies.get('token');

  // Layer constructor for path layer (from deck.gl documentation) (feature has now been disabled)
  // const layer = new PathLayer({
  //   id: "path-layer",
  //   data: path,
  //   getPath: (d) => d.path,
  //   getColor: [73, 146, 255],
  //   getWidth: 7,
  //   widthMinPixels: 2,
  // });

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
        cookies.get('token');
        getCollectedPosts(token).then((data) => data.map((post) => addCollectedPin(post.id)));
        getPosts().then((data) => {
          setPins(data);
          setProgress(oldProgress => oldProgress + 50);
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

      return distance < radius || collectedPins.includes(pin.id);
    });
    return seeAllPins ? pins : closePins;
  }

  const discoverPins = (lat, lng) => {
    const minRadius = 0.05; // Minimum radius of discovery (about 50m from the position)
    const maxRadius = 0.25; // Decided to not use max radius for now
  
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

      return distance > minRadius && !collectedPins.includes(pin.id);
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
          <div className="mapContainer">
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
                const color = `var(--grateful)`;
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
      </div>
    </>
  );
}

export default MapPage;