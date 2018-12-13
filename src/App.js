import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
import CaptureButton from './CaptureButton'
import ImageButtons from './ImageButtons'
import StatusBar from './StatusBar'
import { saveAs } from 'file-saver'
import B64toBlob  from 'b64-to-blob'
import { loadTFJSModel, cleanTFJSResponse, getScaledSize, OBJ_MAP } from './utils'
import './App.css'

const initialState = {
  time: '3',
  timerStatus: 'stopped',
  intervalID: '',
  imgSrc: '',
  peopleData: ''
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
    this.imgRef = React.createRef()
    this.camRef = React.createRef()
    this.canvasRef = React.createRef()
  }

  componentDidMount = async () => {
    this.setState({
      TFModel: await loadTFJSModel()
    })
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
      const imgData = this.camRef.current.getScreenshot()
      this.setState({
        ...initialState,
        imgSrc: imgData
      })
      this.processIMAGE(imgData)
    }
  }

  startCountdown = () => {
    if (this.state.timerStatus === 'stopped') {  
      this.setState({
        ...initialState,
        timerStatus: 'active',
        intervalID: setInterval(() => this.decreaseTimer(), 1000)
      })
    }
  } 

  processIMAGE = async imageURL => {
    const model = this.state.TFModel
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')  
    let scaledImage = new Image()
    scaledImage.onload = async () => {
      const { scaledWidth, scaledHeight } = getScaledSize({
        height: scaledImage.naturalHeight, 
        width: scaledImage.naturalWidth
      })
      scaledImage.width = scaledWidth
      scaledImage.height = scaledHeight
      canvas.width = scaledWidth 
      canvas.height = scaledHeight
      ctx.drawImage(scaledImage, 0, 0, scaledWidth, scaledHeight)
      const newImageTensor = tf.fromPixels(canvas).expandDims()
      try {
        const modelOutput = model.predict(newImageTensor)
        const MAXData = cleanTFJSResponse(Array.from(modelOutput.dataSync()))
        this.setState({ 
          MAXData, 
          peopleData: await this.extractPeople(MAXData)
        })
      } catch (e) {
        console.error(`error saving MAX data - ${ e }`)
        this.setState(initialState)
      }       
    }
    scaledImage.src = imageURL
  }

  extractPeople = MAXData => {
    return new Promise((resolve, reject) => {
      const canvas = this.canvasRef.current
      const ctx = canvas.getContext('2d')
      let img = new Image()
      let imageURL
      img.onload = () => {
        try {
          const { flatSegMap } = MAXData
          const { scaledWidth, scaledHeight } = getScaledSize({
            height: img.naturalHeight, 
            width: img.naturalWidth
          })
          img.width = scaledWidth
          img.height = scaledHeight
          canvas.width = scaledWidth 
          canvas.height = scaledHeight
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const imageData = ctx.getImageData(0, 0, img.width, img.height)
          const data = imageData.data
          
          for (let i = 0; i < data.length; i += 4) {
            const segMapPixel = flatSegMap[i / 4]
            if (segMapPixel !== OBJ_MAP['person']) {
              data[i+3] = 0
            }
          }
          
          ctx.putImageData(imageData, 0, 0)      
          imageURL = canvas.toDataURL()
          resolve(imageURL)
        } catch (e) {
          window.location.reload()
          reject(`${ e } - image load error`)
        }
      }
      img.src = this.state.imgSrc
    })
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
                src={ this.state.peopleData ? this.state.peopleData : this.state.imgSrc } />    
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

          <canvas 
            ref={ this.canvasRef }
            style={ { display: 'none' } }>
          </canvas>  

        </div>
      </div>
    )
  }
}

export default App
