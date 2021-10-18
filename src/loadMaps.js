const loadMaps = (callback) => {
  console.log(document);
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    console.log('!existingScript')
    const script = document.createElement('script');
    script.id = 'googleMaps';
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    script.async = true;
    // document.body.appendChild(script);
    document.head.appendChild(script);
    script.onload = () => { 
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadMaps;