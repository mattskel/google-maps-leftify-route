// import React from 'react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import SearchLocationInput from './SearchLocationInput';
// import loadMaps from './MyMapContainer';
import loadMaps from './loadMaps.js';

// const google = window.google;

// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"

// const apiKey = 'AIzaSyCS_GT9JiqNZviHRqN91R7V9ZYWFLTB61s';

// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }


// class Board extends React.Component {

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {

//     return (
//       <div>
//         {/* <div className="status">{status}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// eslint-disable-next-line
// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null)
//       }],
//       stepNumber: 0,
//       xIsNext: true,
//     }
//   }

//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }

//     squares[i] = (this.state.xIsNext) ? 'X' : 'O';
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     });
//   }

//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: step % 2 === 0
//     })
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);
//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       )  
//     })

//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)} 
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

const Maps = (props) => {
  // const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadMaps(() => {
      // setLoaded(true);
      // map = new google.maps.Map(document.getElementById("map"));
      // console.log('id=map',document.getElementById("map"))
      // console.log(window.google);
      // new window.google.maps.Map(document.getElementById("map"), {});
      new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    });
  });
  return (
      <div id="map"></div>
  );
}


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    // this.state = { googleMapsReady: false };
  }

  // handleSelect(i) {
  //   console.log(i)
  // }
  // Next step will be here
  // https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
  // https://tomchentw.github.io/react-google-maps/
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

// const WrappedMap = GoogleApiWrapper({
//   apiKey
// })(MapContainer);

// ========================================

ReactDOM.render(
  <MapContainer />,
  document.getElementById('root')
);

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// const MyMapComponent = compose(
//   withProps({
//     /**
//      * Note: create and replace your own key in the Google console.
//      * https://console.developers.google.com/apis/dashboard
//      * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
//      */
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     {props.isMarkerShown && (
//       <Marker position={{ lat: -34.397, lng: 150.644 }} />
//     )}
//   </GoogleMap>
// ));

// ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById("root"));

// https://reactjs.org/docs/components-and-props.html
// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
// https://reactjs.org/docs/react-component.html
// https://reactjs.org/docs/components-and-props.html
// https://betterprogramming.pub/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d
// https://medium.com/@ansertechgeek
