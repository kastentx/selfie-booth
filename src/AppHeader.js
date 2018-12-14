import React, { Component } from 'react'
import Particles from 'react-particles-js'
import './AppHeader.css'

export default class AppHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  
  render() {
    return ( 
      <div className="titleBanner">
        <span className="titleText">
          <span className="modelName">
            <b style={ { color: 'green' } }>MAX</b> Image Segmenter 
          </span>
          { `  Holiday Photo Booth 📸🎄` }
        </span>
      </div>
    )
  }
}

const particleParams = {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 950
      }
    },
    "color": {
      "value": "#f5f5f5"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#f5f5f5"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.4,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#f5f5f5",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": false
}