import React, { Component } from 'react'
import Img from './Img'
import ImageButtons from './ImageButtons'
import { Stage, Layer } from 'react-konva'
import './KonvaDisplay.css'

export default class KonvaDisplay extends Component {
  initialState = {
    image1: {
      xPos: 0,
      yPos: 0
    },
    image2: {
      xPos: 0,
      yPos: 0
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  handleDragEndOne = e => {
    this.setState({
      image1: {
        xPos: e.target.x(),
        yPos: e.target.y()
      }
    })
  }

  handleDragEndTwo = e => {
    this.setState({
      image2: {
        xPos: e.target.x(),
        yPos: e.target.y()
      }
    })
  }

  downloadURI(uri, name) {
    let link = document.createElement("a")
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

  downloadStage = () => {
    this.downloadURI(this.refs.stageRef.getStage().toDataURL(), 'happy-holidays.png')
  }

  renderLayer = (layer, image) => {
    const imageState = layer === 'BG' ? this.state.image1 : this.state.image2
    const dragHandler = layer === 'BG' ? this.handleDragEndOne : this.handleDragEndTwo
      return (
      <Img
        src={ image }
        x={ imageState.xPos }
        y={ imageState.yPos }
        draggable={ true }
        onDragEnd={ dragHandler } />
      )
  }

  render() {
    const BGImage = this.props.BG
    const frontImage = this.props.front
    
    return (
      <div>
        <Stage
          className="konvaMain"
          ref='stageRef' 
          height={ 480 }
          width={ 640 }
          >
          <Layer> 
            { BGImage ? this.renderLayer('BG', BGImage) : null }  
            { frontImage ? this.renderLayer('front', frontImage) : null }
          </Layer>
        </Stage>
        <ImageButtons 
          stageRef={ this.stageRef }
          captureData={ this.props.captureData }
          handleReset={ this.props.handleReset }
          handleDownload={ this.downloadStage } />
      </div>
    )
  }
}