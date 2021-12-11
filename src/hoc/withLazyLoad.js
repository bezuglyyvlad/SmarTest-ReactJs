import React from 'react'
import { Preloader } from '../components/common/Preloader'
import LazyLoad from 'react-lazyload'

export const withLazyLoad = (Component) => {
  return (props) => {
    return (
      <LazyLoad
        height={200}
        throttle
        unmountIfInvisible
        offset={900}
        placeholder={<Preloader />}
      >
        <Component {...props} />
      </LazyLoad>
    )
  }
}
