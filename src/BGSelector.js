import React from 'react'
import { Carousel } from 'react-bootstrap'
import { isEmpty, isNonEmpty } from './utils'
import CarouselThumb from './CarouselThumb'
import './BGSelector.css'

const BGSelector = props => {
  const singlePage = isEmpty(props.images) || props.images.length < 5
  return (
    <Carousel
      className={ singlePage ? `singlePageCarousel` : `multiPageCarousel` }
      interval={ null }>
      { getCarouselPages(props) }
    </Carousel>
  )
}

export default BGSelector

const getCarouselPages = props => {
  const numImages = isNonEmpty(props.images) ? props.images.length : 0
  const numPages = numImages % 4 !== 0 ? Math.ceil(numImages / 4) : Math.ceil(numImages / 4) + 1
  let pages = []

  if (numImages !== 0) {
    for (let i=0; i<numPages; i++) {
      pages.push(
        <Carousel.Item
          key={ i }
          animateIn={ true }
          animateOut={ true }>
          <div className="caroCard">
            { getCarouselPageItems(props.images, i).map((img, j) => 
              <CarouselThumb
                thumbProps={ props }
                key={ j }
                imageID={ (i*4)+j }
                image={ img } />
            ) }
          </div>
        </Carousel.Item> 
      )
    }
  } 
  return pages
}

const getCarouselPageItems = (imageThumbs, pageNum) => {
  const startPos = pageNum * 4
  const endPos = startPos + 4
  let pageImages
  if (imageThumbs)
    pageImages = imageThumbs.slice(startPos, endPos)
  return pageImages
}