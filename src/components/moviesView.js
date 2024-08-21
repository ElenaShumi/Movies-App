import React from 'react'

import MobileComponent from './mobileComponent'
import DesktopComponent from './desktopComponent'

export default function MoviesView({ movieList, sessionId, onToggleRating, movieListRated }) {
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  const content = isMobile ? (
    <MobileComponent
      movieList={movieList}
      sessionId={sessionId}
      onToggleRating={onToggleRating}
      movieListRated={movieListRated}
    />
  ) : (
    <DesktopComponent
      movieList={movieList}
      sessionId={sessionId}
      onToggleRating={onToggleRating}
      movieListRated={movieListRated}
    />
  )
  return <>{content}</>
}
