import React, { useState } from "react";
import ReactToolTip from "react-tooltip";
import { useAuth } from "./contexts/authcontext";
import { useHistory } from "react-router-dom";
import { database } from "./firebase";
import GoogleMaps from "./components/NewGoogleMapsThree";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogOut() {
    try {
      await logout();
      history.push("/");
    } catch {
      console.log("Logout Error");
    }
  }

  /*const [searchString, setSearchString] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();

    console.log("search");
  };*/

  /*const handleSearchChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchString({
      [name]: value
    });
  };*/

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      makeListing();
      setListing({
        title: "",
        description: "",
        price: "",
        location: "",
        landlordID: "",
        status: "",
        isBooked: ""
      });
    } catch {
      console.log("property listing creation error");
    }
  };

  function makeListing() {
    setListing({ isBooked: "false" });
    const listingRef = database.ref("Listings");
    listingRef.push(listing);
  }

  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    landlordID: "",
    status: "",
    isBooked: ""
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setListing({
      ...listing,
      [name]: value
    });
  };

  const { getCurrentUID } = useAuth();
  const { getCurrentEmail } = useAuth();
  const [accountType, setAccountType] = useState("Employee");

  if (accountType === "Employee") {
    return (
      <div>
        <p> Dashboard </p>
        <p> Your email address: </p> {getCurrentEmail()}
        <p> Current UID: </p> {getCurrentUID()}
        <button onClick={handleLogOut}> Log Out </button>
        <GoogleMaps />
      </div>
    );
  } else {
    return (
      <div>
        <p> Dashboard </p>
        <p> Your email address: </p> {getCurrentEmail()}
        <p> Current UID: </p> {getCurrentUID()}
        <button onClick={handleLogOut}> Log Out </button>
        <form onSubmit={handleFormSubmit}>
          <label>Listing Name</label>
          <input
            id=""
            type=""
            name="title"
            className=""
            placeholder="Enter your listing title"
            value={listing.title}
            onChange={handleChange}
          />
          <div>
            <label>Description</label>
            <textarea
              name="description"
              cols="40"
              rows="3"
              maxLength="150"
              data-tip
              data-for="descriptionToolTip"
              value={listing.description}
              onChange={handleChange}
            ></textarea>
            <ReactToolTip id="descriptionToolTip" place="bottom" effect="solid">
              There is a max character limit of 150 characters
            </ReactToolTip>
            <button type="submit"> Enter </button>
          </div>
          <label>Price</label>
          <input
            id=""
            type=""
            name="price"
            className=""
            placeholder=""
            value={listing.price}
            onChange={handleChange}
          />
          <div>
            <label>Location</label>
            <input
              id=""
              type=""
              name="location"
              className=""
              placeholder="Enter the location"
              value={listing.location}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Dashboard;

/*const itemsRef = firebase.database().ref("users");
    const user = {
      username: values.email2,
      password: values.password2,
      employeeID: values.EmployeeID
    };
    itemsRef.push(user);
    */
