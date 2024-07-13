import React from 'react'
import {Carousel} from 'react-bootstrap';
import '../../../styles/reactBootstrap.css'

export default function HomePageCarousel() {
  return (
    <div>
      <Carousel id='hiddenPhone' controls={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/HomePageCarousel/carousel1.png"
            alt="First slide"
            width='100%'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/HomePageCarousel/carousel2.png"
            alt="Second slide"
            width='100%'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./img/HomePageCarousel/carousel3.png"
            alt="Third slide"
            width='100%'
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
