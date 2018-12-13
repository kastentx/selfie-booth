import React, { Component } from 'react'
import Webcam from 'react-webcam'
import CaptureButton from './CaptureButton'
import ImageButtons from './ImageButtons'
import StatusBar from './StatusBar'
import { saveAs } from 'file-saver'
import B64toBlob  from 'b64-to-blob'
import './App.css'

const initialState = {
  time: '3',
  timerStatus: 'stopped',
  intervalID: '',
  imgSrc: ''
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
    this.camRef = React.createRef()
  }

  handleDownload = () => {
    saveAs(B64toBlob(this.state.imgSrc.split(',')[1], 'image/png'), `max-selfie.png`)
  }

  handleReset = () => {
    this.setState(initialState)
  }

  decreaseTimer = () => {
    if (this.state.time) {
      this.setState({
        time: this.state.time - 1
      }) 
    } else {
      clearInterval(this.state.intervalID)
      this.setState({
        ...initialState,
        imgSrc: this.camRef.current.getScreenshot()
      })
    }
  }

  startCountdown = () => {
    if (this.state.timerStatus === 'stopped') {  
      this.setState({
        timerStatus: 'active',
        intervalID: setInterval(() => this.decreaseTimer(), 1000),
        imgSrc: ''
      })
    }
  } 

  render() {
    return (
      <div className='app'>
        <div className='app-content'>
          <StatusBar 
            timerStatus={ this.state.timerStatus }
            time={ this.state.time } />
            
          {
            this.state.imgSrc ?
            <div className='content-wrapper'>
            <div>
              <img 
                alt='a webcam capture'
                className='image-display'
                src={ this.state.imgSrc } />    
            </div>
            <div>
                <ImageButtons 
                  imgSrc={ this.state.imgSrc }
                  handleReset={ this.handleReset }
                  handleDownload={ this.handleDownload } />
            </div>
            </div>
          :
            <div>
              <Webcam
                screenshotFormat='image/png'
                className='webcam-display'
                audio={ false }
                ref={ this.camRef } />  
              <CaptureButton handleClick={ this.startCountdown } />
            </div>
          }
          
        </div>
      </div>
    )
  }
}

export default App
