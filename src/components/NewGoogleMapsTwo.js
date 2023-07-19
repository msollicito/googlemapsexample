import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { database } from "../firebase";

export default function SearchAutoComplete() {
  const [searchProps, setSearchProps] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    address: "",
    mapCenter: {
      lat: 51.5278773,
      lng: -0.0543867
    }
  });

  const [listings, setListings] = useState();
  const [coords, setCoords] = useState();

  function handleChange(address) {
    //e.preventDefault();
    setSearchProps({ address: address });
    //firebaseGetListings();
  }

  function handleSelect(address) {
    //console.log(this.state.listings);
    //console.log(this.state.coords);
    console.log("///////");
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        console.log(address);
        setSearchProps({ mapCenter: latLng });
      })
      .catch((error) => console.error("Error", error));
  }

  return (
    <PlacesAutocomplete
      value={searchProps.address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
