import React from 'react'
import KonvaDisplay from './KonvaDisplay'

const ContentDisplay = props => {
  const { peopleData, captureData } = props
  return (
    <div>
      {
        peopleData ? 
        <KonvaDisplay     
          BG={ peopleData }
          front={ peopleData } />
      :
        <img 
          alt='a webcam capture'
          className='image-display'
          src={ peopleData ? peopleData : captureData } />    
      }
      
    </div>
  )
}

export default ContentDisplay
