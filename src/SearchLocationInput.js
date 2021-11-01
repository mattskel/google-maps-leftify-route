import React, { useState, useEffect, useRef } from "react";

let autoComplete;

// https://github.com/Gapur/google-place-autocomplete

// dynamically load JavaScript files in our html with callback when finished
const loadScript = (url, callback) => {
  let script = document.createElement("script"); // create script tag
  script.type = "text/javascript";

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName("head")[0].appendChild(script); // append to head
};

// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(updateQuery, autoCompleteRef) {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery, addressObject, map, directionsService, directionsRenderer) {
  // const addressObject = autoComplete.getPlace(); // get place from google api
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);

  const homeCoords = {lat: -31.922, lng: 115.891}

  // const marker = new window.google.maps.Marker({
  //   position: addressObject.geometry.location,
  //   map: map,
  // });
  // marker.setPosition(addressObject.geometry.location)

  // map.setCenter(addressObject.geometry.location);

  var request = {
    origin: addressObject.geometry.location,
    destination: homeCoords,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
  
}

function SearchLocationInput() {
  // console.log('SearchLocationInput')
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  // console.log(process.env.REACT_APP_GOOGLE_API_KEY);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={event => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

// export default SearchLocationInput;
export {handlePlaceSelect};