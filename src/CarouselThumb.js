import React from 'react'
import { getFormattedName } from './utils' 
import './CarouselThumb.css'

const CarouselThumb = props => {
  const { imageID, image, thumbProps } = props
  return (
    <div 
      key={ imageID } 
      className={ applyImageClass(thumbProps, imageID) }>
      <span 
        className="imageLabel top"
        onClick={ () => handleImageClick(thumbProps, imageID) }>
        <span className="imageTitle">
          { getFormattedName(image) }
        </span>
      </span>
      <img
        className="thumbImage"
        src={ image }
        alt={ 'a background' } 
        onClick={ () => handleImageClick(thumbProps, imageID) } />
    </div>
  )
}

export default CarouselThumb

const handleImageClick = (thumbProps, imageID) => {
  if (imageID !== thumbProps.selectedImage) {
    console.log(imageID)
    thumbProps.setSelectedBG(imageID)
  } else {
    thumbProps.setSelectedBG('')
  }
}

const applyImageClass = (thumbProps, imageID) => {
  if (imageID !== 'ADD AN IMAGE' && imageID === thumbProps.selectedImage) {
    return `selectedImageThumb`
  } else if (imageID === 'ADD AN IMAGE' && thumbProps.mode === 'upload') { 
    return `selectedImageThumb`
  } else {
    return `savedImageThumb`
  }
}