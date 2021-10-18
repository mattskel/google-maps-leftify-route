function loadMaps(callback) {
  console.log('loadScript')
  const existingScript = document.getElementById('googleMaps');
  if (existingScript && callback) {
    callback();
    return;
  }

  // Create the script tag, set the appropriate attributes
  var script = document.createElement('script');
  // script.type = "text/javascript";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  // script.async = true;
  script.id = 'googleMaps';

  // Attach your callback function to the `window` object
  // window.initMap = function() {
  //   // JS API is loaded and available
  //   callback();
  // };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
  script.onload = () => { 
    if (callback) callback();
  };
}

// function MyMapContainer() {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     console.log('useEffect');
//     loadScript(() => {
//       setLoaded(true);
//     });
//   });

//   return (
//     // <div id="map"></div>
//     <div className="maps-component">
//       {loaded ? <div id="map"></div> : ''}
//     </div>
//   );
// }

// export default MyMapContainer;
export default loadMaps;

// https://developers.google.com/maps/documentation/javascript/overview#Loading_the_Maps_API

// https://betterprogramming.pub/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d