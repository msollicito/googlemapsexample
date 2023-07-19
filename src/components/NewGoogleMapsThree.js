import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { database } from "../firebase";

const containerStyle = {
  width: "100vw",
  height: "100vh"
};

//const libraries = ["places"];
const getLibraries = ["places"];

export default function GSearch() {
  //firebaseGetListings();

  const [center, setCenter] = useState({ lat: 51.5074, lng: 0.1278 });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback(
    (latlngObj) =>
      setMarkers((current) => [
        ...current,
        {
          lat: latlngObj.lat,
          lng: latlngObj.lng,
          time: new Date()
        }
      ]),
    []
  );

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  });

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    //mapRef.current.setZoom(14);
  });

  const [curSelect, setCurSelect] = useState(null);
  const libraries = getLibraries;

  const [values, setValues] = useState({
    title: "",
    price: "",
    desc: "",
    location: ""
  });

  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyC44LmEfw4hs78DkfdGjAnAXbL6PO8-AUQ"
        libraries={libraries}
      >
        <AutoSearch panTo={panTo} placePin={onMapClick} />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          <React.Fragment>
            {markers.map((marker) => (
              <Marker
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setCurSelect(marker);
                }}
              />
            ))}

            {curSelect ? (
              <InfoWindow
                position={curSelect}
                onCloseClick={() => {
                  setCurSelect(null);
                }}
              >
                <div>
                  <p> Title: {values.title}</p>
                  <p> Price: {values.price}</p>
                  <p> Description: {values.desc}</p>
                  <p> Location: {values.location}</p>
                </div>
              </InfoWindow>
            ) : null}
          </React.Fragment>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

function AutoSearch({ panTo, placePin }) {
  const [currrentLatLng, setCurrentLatLng] = useState();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  //const [cur, setCur] = useState();

  var list = [];
  //hello1();

  /*
  async function hello1() {
    const dbRef = database.ref("Listings");
    await dbRef.on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // const list = () => {
        // title: toString(childSnapshot.val())
        //}
        //list = childSnapshot.val();
        //console.log(list);
        //console.log(list);
        //var loc = list.location;
        //console.log(loc);
        var myJson2 = JSON.parse(JSON.stringify(childSnapshot.val()));
        //console.log(myJSON["title"]);
        list = [myJson2.location];
        //console.log(list);
        getGeocode(list[0])
          .then((results) => getLatLng(results[0]))
          .then((latLng) => {
            placePin({ latLng });
            //console.log(latLng)
          });
      });
    });
  }
  //console.log(listingsList);
*/
  //var i;
  //for (i = 0; i <= listingsList.length; i++) {
  //placePin(getGeocode(listingsList[i].location));
  //setVals({ title: listingsList[i].title, price: listingsList[i].price, desc: listingsList[i].description, location: listingsList[i].location });
  // }

  //console.log(list);

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setCurrentLatLng({ lat, lng });
          panTo({ lat, lng });
          console.log({ lat, lng });
          placePin({ lat, lng });
        } catch (error) {
          console.log(error);
        }
        //console.log(address);
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search here"
      />

      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption
                key={description}
                value={description}
              ></ComboboxOption>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

//function FirebaseGetListings({ placePin, setVals }) {

/*const [list, setList] = useState({
    title: "",
    price: "",
    location: "",
  });
  const dbRef = database.ref();
  dbRef
    .child("Listings")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });*/

/*const [parameter, setParameter] = useState({
    address: ""
  });
  const [list, setList] = useState();

  var [listingObjects, setListingObjects] = useState({});
  var keysList = [];
  var listingsList = [];

  useEffect(() => {
    const dbRef = database.ref("Listings");
    dbRef.on("value", (snapshot) => {
      setListingObjects({
        ...snapshot.val()
      });
    });
  }, []);

  for (let id in listingObjects) {
    listingsList.push({ ...listingObjects[id] });
    keysList.push({ id });
  }
*/
/* const snapshotInfo = database.ref("Listings").on("value", (snapshot){});
  function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}
*/
//console.log(listingsList[keysList[0]].location);
//console.log(listingsList);
//console.log("keys");
//console.log(keysList);
//console.log("acc keys");
//console.log(keysList[0]);
//console.log("acc location");
//console.log(listingsList[keysList[0].id].location);
//const listingsList = [];
/*
  function getListingsC() {
    const dbRef = database.ref("Listings");
    dbRef.on("value", (snapshot) => {
      const listingsList = [];
      const firebaseListingsObject = snapshot.val();

      for (let id in firebaseListingsObject) {
        listingsList.push({ id, ...firebaseListingsObject[id] });
      }
      //console.log(listingsList);
      return listingsList;
      //console.log(list[0]);
      //var x;
      //for (x = 0;x<5;x++){
      //  listingsList.push(firebaseListingsObject[x]);
      // console.log(firebaseListingsObject[x])
      //}
    });
  }*/

//const listingsList1 = getListingsC();
// console.log(listingsList1);

//console.lolistingObjects

//console.log(listingObjects["-MYBghWycWZfrUZBdUQ9"].location);

//var i;
//for (let x in listingObjects) {

// }

//if (listingsList.length >= 5){

//

// return <div>test123</div>;
