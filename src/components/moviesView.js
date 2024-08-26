import React, { Component } from 'react'

import MobileComponent from './mobileComponent'
import DesktopComponent from './desktopComponent'

export default class MoviesView extends Component {
  state = {
    isMobile: window.innerWidth < 1116,
  }

  #handleResize

  componentDidMount() {
    this.#handleResize = () => this.setState({ isMobile: window.innerWidth < 1116 })
    window.addEventListener('resize', this.#handleResize)
  }

  componentWillUnmount() {
    return () => window.removeEventListener('resize', this.#handleResize)
  }

  render() {
    const { movieList, sessionId, onToggleRating, movieListRated, ratingList, setRating } = this.props
    const { isMobile } = this.state

    const content = isMobile ? (
      <MobileComponent
        movieList={movieList}
        sessionId={sessionId}
        onToggleRating={onToggleRating}
        movieListRated={movieListRated}
        setRating={setRating}
        ratingList={ratingList}
      />
    ) : (
      <DesktopComponent
        movieList={movieList}
        sessionId={sessionId}
        onToggleRating={onToggleRating}
        movieListRated={movieListRated}
        setRating={setRating}
        ratingList={ratingList}
      />
    )
    return <>{content}</>
  }
}
