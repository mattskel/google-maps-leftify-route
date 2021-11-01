import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import loadMaps from './loadMaps.js';
import loadScript from './LoadScript.js';
import {handlePlaceSelect} from './SearchLocationInput.js';

let autoComplete;
let map;
// let marker;
let directionsService;
let directionsRenderer

function handleScriptLoad(autoCompleteRef, mapRef, updateQuery) {
  const homeCoords = {lat: -31.922, lng: 115.891}
  map = new window.google.maps.Map(mapRef.current, {center: {...homeCoords}, zoom: 16})
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { componentRestrictions: { country: "au" }, fields: ['formatted_address', 'geometry'] }
  );
  // marker = new window.google.maps.Marker({
  //   position: homeCoords,
  //   map: map,
  // });

  directionsService = new window.google.maps.DirectionsService();
  directionsRenderer = new window.google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () => {
    const addressObject = autoComplete.getPlace(); // get place from google api
    console.log('addressObject', addressObject);
    handlePlaceSelect(updateQuery, addressObject, map, directionsService, directionsRenderer)
  });
}

const Maps = () => {
  const mapRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(autoCompleteRef, mapRef, setQuery)
    );
  }, []);
  return (
    <div>
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        value={query}
      />
      {/* <div id="map"></div> */}
      <div id="map" ref={mapRef}></div>
    </div>  
  );
}


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  render() {
    console.log('render');
    return (
      <div>
        <div>This is where the map will go</div>
        <div className="map-container">
          <Maps />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <MapContainer />,
  document.getElementById('root')
);
