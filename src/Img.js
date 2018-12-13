import React, { Component } from 'react'
import { Image } from 'react-konva'

let imgCache = {
	brokenImage: document.createElement("img")
}

let brokenImage = imgCache.brokenImage
brokenImage.src = "../images/codait-logo.png"
brokenImage.onload = () => {
	this.brokenImage = true
}

class Img extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: null,
			error: false,
			loaded: false,
			hover: false
		}
	}

	loadImg(src) {
		if (!src) {
			throw new Error("Expected image src instead saw " + typeof src)
		}
		let img = imgCache[src]
		if (!img) {
			img = imgCache[src] = document.createElement("img")
			img.loadFns = []
			img.errorFns = []
			img.onerror = () =>  {
				img.error = true
				img.errorFns.forEach(fn => fn.call(img))
			}
			img.onload = () => {
				let hasNH = 'naturalHeight' in img,
					w = hasNH ? 'naturalWidth' : 'width',
					h = hasNH ? 'naturalHeight' : 'height',
					invalidImg = img[w] + img[h] === 0
				if (invalidImg) {
					img.onerror()
				} else {
					img.loaded = true
					img.loadFns.forEach(fn => fn.call(img))
				}
			}
		}
		if (!img.loaded && !img.error) {
			img.loadFns.push(() => {
				img.loaded = true
				this.setState({ loaded: true, image: img })
			})
			img.errorFns.push(() => {
				img.error = true
				this.setState({ error: true, image: brokenImage })
			})
		} else if (img.error) {
			this.setState({ error: true, image: brokenImage })
		} else {
			this.setState({ loaded: true, image: img })
		}
		if (!img.src) {
			img.src = src
		}
	}

	fillRect = (p, c) => {
		return (c.width / c.height) < (p.width / p.height)
			? { width: p.width, height: c.height * (p.width / c.width) }
			: { height: p.height, width: c.width * (p.height / c.height) }
	}

	fitRect = (p, c) => {
		return (c.width / c.height) > (p.width / p.height)
			? { width: p.width, height: c.height * (p.width / c.width) }
			: { height: p.height, width: c.width * (p.height / c.height) }
	}

	getDims = (space, parent, child) => {
		switch (space) {
			case "fill":
				return this.fillRect(parent, child)
			case "fit":
			default:
				return this.fitRect(parent, child)
		}
	}

	componentWillMount = () => {
		this.loadImg(this.props.src)
	}

	componentWillReceiveProps = nextProps => {
		this.loadImg(nextProps.src)
	}

	render = () => {
			const imageDims = {width: 640, height: 480 }
			const pos = { x: this.props.x || 0, y: this.props.y || 0 }
		return (
			<Image 
				stroke={ '#0aa' }
				strokeWidth={ 6 }
				strokeEnabled={ this.state.hover }
        image={ this.state.image } 
        x={ pos.x } 
        y={ pos.y } 
        width={ imageDims.width } 
        height={ imageDims.height }
        draggable={ this.props.draggable }
        onDragEnd={ this.props.onDragEnd }
				onMouseOver={ () => this.setState({
					hover: true
				}) }
				onMouseLeave={ () => this.setState({
					hover: false
				}) } />
		)
	}
}

export default Img