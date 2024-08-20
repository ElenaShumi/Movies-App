import React, { Component } from 'react'
import { Spin, Alert, Result } from 'antd'

import MoviesView from './moviesView'

export default class MovieCard extends Component {
  truncateOverview(str) {
    return str.length > 190 ? str.slice(0, str.indexOf(' ', 190)) + '…' : str
  }

  render() {
    const { movieList, loading, error, onToggleRating, sessionId, movieListRated } = this.props

    // const hasDate = !(loading || error)

    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spiner /> : null
    // const content = hasDate ? <MoviesView movieList={movieList} /> : null

    const searchResult =
      movieList.length !== 0 ? (
        <MoviesView
          movieList={movieList}
          onToggleRating={onToggleRating}
          sessionId={sessionId}
          movieListRated={movieListRated}
        />
      ) : (
        <Result
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
          status="404"
          title="Nothing Found!"
          subTitle="It seems we can't find what you're looking for."
        />
      )

    return (
      <>
        {errorMessage}
        {spinner}
        {/* {content} */}
        {searchResult}
      </>
    )
  }
}

const Spiner = () => {
  return (
    <>
      <Spin fullscreen="true" tip="Loading" size="large" />
    </>
  )
}

const ErrorIndicator = () => {
  return (
    <>
      <Alert
        style={{ margin: '100px auto' }}
        message="Error"
        description="Something went wrong. Please try again"
        type="error"
        showIcon
      />
    </>
  )
}
