import React from 'react'
import Carousel from 'antd/es/carousel'
import 'antd/es/carousel/style/css'
import style from './style.css'

const carousel = () => {
  return (
    <div className={style.carousel}>
      <Carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>
    </div>
  )
}

export default carousel
