// Use the MapBox Reverse Geocoding API to get the location name from the latitude and longitude.
function Geolocation(latitude, longitude, setLocation) {
  const apiKey = "pk.eyJ1IjoiYWRlcGdlIiwiYSI6ImNsdHo2dW1ycDBsODUyaXFtenlzbmlyZHYifQ.BOt1O2WxbF8jnEgZcIj1aQ";
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
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