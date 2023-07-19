import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { database } from "../firebase";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.firebaseGetListings();
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
      //this.setState = {
      //listings: listingsList,
      //coords: coordsList
      //};

      // was getting an error due to the few bugs in the maps module so had to mutate
      //state directly instead of using setState

      //console.log(this.state.listings)
      //console.log(listingsList[0].location);
      //console.log(snapshot.val());
      //console.log(coordsList)
    });
  };

  handleChange = (address, props) => {
    this.setState({ address });
  };

  handleSelect = (address, props) => {
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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
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
        </div>
        <div>
          <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            center={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={"Current location"}
              position={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng
              }}
            />

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC44LmEfw4hs78DkfdGjAnAXbL6PO8-AUQ"
})(MapContainer);
