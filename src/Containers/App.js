import React from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "../Components/Navigation/Navigation.js";
import Logo from "../Components/Logo/Logo.js";
import Rank from "../Components/Rank/Rank.js";
import ImageLinkForm from "../Components/ImageLinkForm/ImageLinkForm.js";
import ImageDetection from "../Components/ImageDetection/ImageDetection.js";

const particleAnimation = {
  particles: {
    number: {
      value: 101,
      density: {
        enable: true,
        value_area: 10000
      }
    },
    color: {
      value: "#c4c8e6"
    },
    shape: {
      type: "polygon",
      stroke: {
        width: 0,
        color: "#000"
      },
      polygon: {
        nb_sides: 6
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.1736124811591,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 76.16207289111233,
      random: false,
      anim: {
        enable: true,
        speed: 10,
        size_min: 40,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 200,
      color: "#ffffff",
      opacity: 1,
      width: 2
    },
    move: {
      enable: true,
      speed: 8,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 401.97822008916586,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: false
};

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particleAnimation} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
      <SignOut />
      <DetectButton />
      <ImageDetection /> */}
    </div>
  );
}

export default App;
