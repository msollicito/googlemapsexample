//import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { database } from "../firebase";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    //this.firebaseGetListings();
    this.input = React.createRef();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      address: "",
      mapCenter: {
        lat: 51.5278773,
        lng: -0.0543867
      },
      listings: {},
      coords: {}
      //addresses: []
    };
  }

  firebaseGetListings = (props) => {
    const listingsList = [];
    const coordsList = [];
    //const coordsList = []
    const dbRef = database.ref("Listings");
    dbRef.on("value", (snapshot) => {
      const firebaseListingsObject = snapshot.val();
      for (let id in firebaseListingsObject) {
        listingsList.push(firebaseListingsObject[id]);
      }
      //var i;
      for (let i in listingsList) {
        geocodeByAddress(listingsList[i].location)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            //console.log(latLng)
            coordsList.push(latLng);
            //console.log(coordsList)
          })
          .catch((error) => console.log("geocode error"));
      }
      //for (let i in addressList)
      this.setState = {
        listings: listingsList,
        coords: coordsList
      };

      // was getting an error due to the few bugs in the maps module so had to mutate
      //state directly instead of using setState

      //console.log(this.state.listings)
      //console.log(listingsList[0].location);
      //console.log(snapshot.val());
      //console.log(coordsList)
    });
  };

  handleChange = (address) => {
    //e.preventDefault();
    //this.setState({ address: address });
    this.firebaseGetListings();
  };

  handleSelect = (address) => {
    console.log(this.state.listings);
    console.log(this.state.coords);
    console.log("///////");
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        console.log(address);
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              ref={this.input}
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={suggestion.description} // without this an error is
                    //caused as each child element has to have its own unique key
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

/*
export default GoogleApiWrapper({
  apiKey: "AIzaSyC44LmEfw4hs78DkfdGjAnAXbL6PO8-AUQ"
})(MapContainer);
*/
