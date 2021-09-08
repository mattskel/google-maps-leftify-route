// import logo from './logo.svg';
// import './App.css';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%'
}

this.fetchPlaces = function(mapProps, map) {
  const {google} = mapProps;
  const service = new google.maps.places.PlacesService(map);
  // ...
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Hello, Google maps.
//         </p>
//       </header>
//     </div>
//   );
// }

// export default App;

export class MapContainer extends Component {
  render() {
    return (
      // <Map
      // google={this.props.google}
      // zoom={14}
      // style={mapStyles}
      // initialCenter={
      //   {
      //     lat: -1.2884,
      //     lng: 36.8233
      //   }
      // }
      // />
      // <div className="wrapper">
      //   <h1>Route form</h1>
      //   <form>
      //     <fieldset>
      //       <label>
      //         <p>Depart</p>
      //         <input name="depart" />
      //       </label>
      //       <label>
      //         <p>Arrive</p>
      //         <input name="arrive" />
      //       </label>
      //     </fieldset>
      //     <button type="submit">Submit</button>
      //   </form>
      // </div>

      <Map google={this.props.google}
        onReady={this.fetchPlaces}
        visible={false}>
          <Listing places={this.state.places} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCS_GT9JiqNZviHRqN91R7V9ZYWFLTB61s'
})(MapContainer);
