
function Geolocation(latitude, longitude, setLocation) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (data.results && data.results.length > 0) {
      const placeName = data.results[0].formatted_address;
      setLocation(placeName.split(',')[0]);
    } else {
      setLocation('Unknown Location');
    }
  })
  .catch(error => {
    console.error(error);
  });
}
 
export default Geolocation;