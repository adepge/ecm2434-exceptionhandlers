import {CircleLayer} from '@deck.gl/layers';

function Geolocation(latitude, longitude) {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then(data => {
    if (data.results && data.results.length > 0) {
      const placeName = data.results[0].formatted_address;
      console.log(placeName);
    } else {
      console.log('No results found');
    }
  })
  .catch(error => console.error(error));
}
 
export default places;