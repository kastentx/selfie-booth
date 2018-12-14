import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
import CaptureButton from './CaptureButton'
import StatusBar from './StatusBar'
import { saveAs } from 'file-saver'
import B64toBlob  from 'b64-to-blob'
import { loadTFJSModel, cleanTFJSResponse, getScaledSize, OBJ_MAP, getShuffledBGs } from './utils'
import './App.css'
import ContentDisplay from './ContentDisplay';
import BGSelector from './BGSelector';
import AppHeader from './AppHeader';

const initialState = {
  time: '3',
  timerStatus: 'stopped',
  intervalID: '',
  captureData: '',
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
      TFModel: await loadTFJSModel(),
      BGList: getShuffledBGs()
    })
  }

  handleDownload = () => {
    saveAs(B64toBlob(this.state.captureData.split(',')[1], 'image/png'), `max-selfie.png`)
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
        captureData: imgData
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
      img.src = this.state.captureData
    })
  }

  render() {
    return (
      <div className='app'>
        <div className='app-content'>
        <div className='row-one'>
          <AppHeader />
        </div>
        <div className='row-two'>
          <div className='content-card'>
            <StatusBar 
              peopleData={ this.state.peopleData }
              timerStatus={ this.state.timerStatus }
              time={ this.state.time } />
            {
              this.state.captureData ?
              <div className='content-wrapper'>
                <ContentDisplay
                  selectedBG={ this.state.selectedBG || this.state.BGList[0] }
                  captureData={ this.state.captureData } 
                  peopleData={ this.state.peopleData }
                  handleReset={ this.handleReset }
                  handleDownload={ this.handleDownload } />            
              </div>
            :
              <div className='content-wrapper'>
                <Webcam
                  height='480'
                  width='640'
                  screenshotFormat='image/png'
                  className='webcam-display'
                  audio={ false }
                  ref={ this.camRef } />  
                <div>
                  <CaptureButton handleClick={ this.startCountdown } />
                </div>
              </div>
            }
          </div>
        </div>
        <div className='row-three'>
          <BGSelector
            images={ this.state.BGList } 
            setSelectedBG={ selectedBGKey => {
              console.log(selectedBGKey)
              this.setState({ 
                selectedBG: this.state.BGList[selectedBGKey] 
              })
            } }
            />
        </div>
        
      </div>
      <canvas 
          ref={ this.canvasRef }
          style={ { display: 'none' } }>
      </canvas>  
      <div className='snowflakes'>
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    </div>
    )
  }
}

export default App
