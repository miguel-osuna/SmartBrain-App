// Packages
import React, { Component } from "react";
import particleAnimation from "./particlesjs-config.json";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

// User Components
import Navigation from "../Components/Navigation/Navigation.js";
import Logo from "../Components/Logo/Logo.js";
import Rank from "../Components/Rank/Rank.js";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm.js";
import ImageDetection from "../Components/ImageDetection/ImageDetection.js";
import SignIn from "../Components/SignIn/SignIn.js";
import Register from "../Components/Register/Register.js";
import "./App.css";

// Initialize with API Key
const app = new Clarifai.App({ apiKey: "f73fa5b8f7e946c3820224301837db65" });

class App extends Component {
  // React Component Constructor
  constructor() {
    super();
    this.state = {
      user_input: "",
      image_url: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }

  onInputChange = event => {
    // Adds the text input to property user_input
    this.setState({ user_input: event.target.value });
  };

  calculateFaceLimits = data => {
    const box_limits = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      top_row: height * box_limits.top_row,
      bottom_row: height * (1 - box_limits.bottom_row),
      left_col: width * box_limits.left_col,
      right_col: width * (1 - box_limits.right_col)
    };
  };

  displayFaceLimits = box => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ image_url: this.state.user_input });

    // API Promise
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // Using image_url can lead to a 404 Bad Request
        this.state.user_input
      )
      .then(response =>
        this.displayFaceLimits(this.calculateFaceLimits(response))
      )
      .catch(err => console.log(err));
  };

  onEnterSubmit = event => {
    // When Enter key is pressed
    if (event.keyCode === 13) {
      this.setState({ image_url: this.state.user_input });

      // API Promise
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          // Using image_url can lead to a 404 Bad Request
          this.state.user_input
        )
        .then(response =>
          this.displayFaceLimits(this.calculateFaceLimits(response))
        )
        .catch(err => console.log(err));
    }
  };

  onRouteChange = route => {
    route === "home"
      ? this.setState({ isSignedIn: true })
      : this.setState({ isSignedIn: false });
    this.setState({ route: route });
  };

  renderSwitch = route => {
    const {
      onInputChange,
      onButtonSubmit,
      onEnterSubmit,
      onRouteChange
    } = this;
    const { image_url, box, isSignedIn } = this.state;

    switch (route) {
      case "home":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
              onEnterSubmit={onEnterSubmit}
            />
            <ImageDetection image_url={image_url} box={box} />
          </div>
        );

      case "signin":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <SignIn onRouteChange={onRouteChange} />
          </div>
        );

      case "register":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <Register onRouteChange={onRouteChange} />
          </div>
        );

      default:
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <SignIn onRouteChange={onRouteChange} />
          </div>
        );
    }
  };

  render() {
    const { renderSwitch } = this;
    const { route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleAnimation} />
        <div>{renderSwitch(route)}</div>
      </div>
    );
  }
}

export default App;
