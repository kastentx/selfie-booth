import React, { Component } from 'react'
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
          { `  Holiday Photo Booth ` }<span aria-label="holiday photo" role="img">📸🎄</span> 
        </span>
      </div>
    )
  }
}