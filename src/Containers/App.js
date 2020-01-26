// Packages
import React, { Component } from "react";
import particleAnimation from "./particlesjs-config.json";
import Particles from "react-particles-js";

// User Components
import Navigation from "../Components/Navigation/Navigation.js";
import Logo from "../Components/Logo/Logo.js";
import Rank from "../Components/Rank/Rank.js";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm.js";
import ImageDetection from "../Components/ImageDetection/ImageDetection.js";
import SignIn from "../Components/SignIn/SignIn.js";
import Register from "../Components/Register/Register.js";
import "./App.css";

// Initial State
const initial_state = {
  user_input: "",
  image_url: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  // React Component Constructor
  constructor() {
    super();
    this.state = {
      user_input: "",
      image_url: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onInputChange = event => {
    // Adds the text input to property user_input
    this.setState({ user_input: event.target.value });
  };

  calculateFaceLimits = data => {
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    // const box_limits = data.outputs[0].data.regions[0].region_info.bounding_box;

    const boxes_limits = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    });

    const face_boxes = boxes_limits.map(box_limits => {
      return {
        top_row: height * box_limits.top_row,
        bottom_row: height * (1 - box_limits.bottom_row),
        left_col: width * box_limits.left_col,
        right_col: width * (1 - box_limits.right_col)
      };
    });

    return face_boxes;
  };

  displayFaceLimits = boxes => {
    this.setState({ boxes: boxes });
  };

  onButtonSubmit = () => {
    this.setState({ image_url: this.state.user_input });

    // API Promise
    fetch(process.env.REACT_APP_HOME_PAGE + "/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.user_input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(process.env.REACT_APP_HOME_PAGE + "/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }

        const boxes = this.calculateFaceLimits(response);
        this.setState(
          Object.assign(this.state.user, { entries: boxes.length })
        );
        this.displayFaceLimits(boxes);
      })
      .catch(err => console.log(err));
  };

  onEnterSubmit = event => {
    // When Enter key is pressed
    if (event.keyCode === 13) {
      this.setState({ image_url: this.state.user_input });

      fetch(process.env.REACT_APP_HOME_PAGE + "/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.user_input
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch(process.env.REACT_APP_HOME_PAGE + "/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              });
          }
          this.displayFaceLimits(this.calculateFaceLimits(response));
        })
        .catch(err => console.log(err));
    }
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initial_state);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  renderSwitch = route => {
    const {
      loadUser,
      onInputChange,
      onButtonSubmit,
      onEnterSubmit,
      onRouteChange
    } = this;
    const { image_url, boxes, isSignedIn, user } = this.state;

    switch (route) {
      case "home":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
              onEnterSubmit={onEnterSubmit}
            />
            <ImageDetection image_url={image_url} boxes={boxes} />
          </div>
        );

      case "signin":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          </div>
        );

      case "register":
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          </div>
        );

      default:
        return (
          <div>
            <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
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
