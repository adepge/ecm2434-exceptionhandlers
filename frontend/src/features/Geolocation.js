// Use the MapBox Reverse Geocoding API to get the location name from the latitude and longitude.
function Geolocation(latitude, longitude, setLocation) {
  const apiKey = import.meta.env.VITE_MAPBOX_PUBLIC_API_KEY;
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.features && data.features.length > 0) {
      const placeName = data.features[0].text;
      setLocation(placeName);
    } else {
      setLocation('Unknown Location');
    }
  })
  .catch(error => {
    console.error(error);
  });
}

export default Geolocation;