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
import Modal from "../Components/Modal/Modal.js";
import Profile from "../Components/Profile/Profile.js";
import "./App.css";

// Initial State
const initial_state = {
  user_input: "",
  image_url: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
    age: "",
    occupation: ""
  },
  faces: 0
};

class App extends Component {
  // React Component Constructor
  constructor() {
    super();
    this.state = initial_state;
  }

  async componentDidMount() {
    const token = this.getAuthTokenInSessions();
    if (token) {
      const res_signin = await fetch(
        process.env.REACT_APP_HOME_PAGE + "/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token }
        }
      );

      try {
        const data = await res_signin.json();

        if (data && data.id) {
          const res_profile = await fetch(
            process.env.REACT_APP_HOME_PAGE + `/profile/${data.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          );

          const user = await res_profile.json();
          if (user && user.email) {
            this.loadUser(user);
            this.onRouteChange("home");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        age: data.age,
        occupation: data.occupation,
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
    if (data && data.outputs) {
      const image = document.getElementById("image");
      const width = Number(image.width);
      const height = Number(image.height);

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
    }
    return;
  };

  displayFaceLimits = boxes => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  };

  onButtonSubmit = async () => {
    try {
      this.setState({ image_url: this.state.user_input });
      const token = this.getAuthTokenInSessions("token");

      // API Promise
      const res_imageurl = await fetch(
        process.env.REACT_APP_HOME_PAGE + "/imageurl",
        {
          method: "post",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({
            input: this.state.user_input
          })
        }
      );

      const data = await res_imageurl.json();

      if (data) {
        const res_image = await fetch(
          process.env.REACT_APP_HOME_PAGE + "/image",
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }
        );

        const count = await res_image.json();
        this.setState(Object.assign(this.state.user, { entries: count }));
      }

      const boxes = this.calculateFaceLimits(data);
      this.setState(Object.assign(this.state.faces, { faces: boxes.length }));
      this.displayFaceLimits(boxes);
    } catch (err) {
      console.log(err);
    }
  };

  onEnterSubmit = async event => {
    if (event.keyCode === 13) {
      try {
        this.setState({ image_url: this.state.user_input });
        const token = this.getAuthTokenInSessions("token");

        // API Promise
        const res_imageurl = await fetch(
          process.env.REACT_APP_HOME_PAGE + "/imageurl",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify({
              input: this.state.user_input
            })
          }
        );

        const data = await res_imageurl.json();

        if (data) {
          const res_image = await fetch(
            process.env.REACT_APP_HOME_PAGE + "/image",
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            }
          );

          const count = await res_image.json();
          this.setState(Object.assign(this.state.user, { entries: count }));
        }

        const boxes = this.calculateFaceLimits(data);
        this.setState(Object.assign(this.state.faces, { faces: boxes.length }));
        this.displayFaceLimits(boxes);
      } catch (err) {
        console.log(err);
      }
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

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  saveAuthTokenInSessions = token => {
    window.sessionStorage.setItem("token", token);
  };

  getAuthTokenInSessions = () => {
    return window.sessionStorage.getItem("token");
  };

  delAuthTokenInSessions = () => {
    window.sessionStorage.removeItem("token");
  };

  renderSwitch = route => {
    const {
      loadUser,
      onInputChange,
      onButtonSubmit,
      onEnterSubmit,
      onRouteChange,
      toggleModal,
      saveAuthTokenInSessions,
      getAuthTokenInSessions,
      delAuthTokenInSessions
    } = this;
    const {
      image_url,
      boxes,
      isSignedIn,
      isProfileOpen,
      user,
      faces
    } = this.state;

    switch (route) {
      case "home":
        return (
          <div>
            <Navigation
              onRouteChange={onRouteChange}
              isSignedIn={isSignedIn}
              toggleModal={toggleModal}
              delAuthTokenInSessions={delAuthTokenInSessions}
            />
            {isProfileOpen && (
              <Modal>
                <Profile
                  isProfileOpen={isProfileOpen}
                  toggleModal={toggleModal}
                  loadUser={loadUser}
                  user={user}
                  getAuthTokenInSessions={getAuthTokenInSessions}
                />
              </Modal>
            )}
            <Logo />
            <Rank name={user.name} entries={user.entries} faces={faces} />
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
            <Navigation
              onRouteChange={onRouteChange}
              isSignedIn={isSignedIn}
              toggleModal={toggleModal}
              delAuthTokenInSessions={delAuthTokenInSessions}
            />
            <SignIn
              onRouteChange={onRouteChange}
              loadUser={loadUser}
              saveAuthTokenInSessions={saveAuthTokenInSessions}
            />
          </div>
        );

      case "register":
        return (
          <div>
            <Navigation
              onRouteChange={onRouteChange}
              isSignedIn={isSignedIn}
              toggleModal={toggleModal}
              delAuthTokenInSessions={delAuthTokenInSessions}
            />
            <Register
              onRouteChange={onRouteChange}
              loadUser={loadUser}
              saveAuthTokenInSessions={saveAuthTokenInSessions}
            />
          </div>
        );

      default:
        return (
          <div>
            <Navigation
              onRouteChange={onRouteChange}
              isSignedIn={isSignedIn}
              toggleModal={toggleModal}
              delAuthTokenInSessions={delAuthTokenInSessions}
            />
            <SignIn
              onRouteChange={onRouteChange}
              loadUser={loadUser}
              saveAuthTokenInSessions={saveAuthTokenInSessions}
            />
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
