import React, { Component } from 'react'
import { Spin, Alert, Result } from 'antd'

import MoviesView from './moviesView'

export default class MovieCard extends Component {
  truncateOverview(str) {
    return str.length > 190 ? str.slice(0, str.indexOf(' ', 190)) + '…' : str
  }

  render() {
    const { movieList, loading, error, onToggleRating, sessionId, ratingList, setRating } = this.props

    const hasDate = !(loading || error)

    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spiner /> : null

    const searchResult =
      movieList.length !== 0 ? (
        <MoviesView
          movieList={movieList}
          onToggleRating={onToggleRating}
          sessionId={sessionId}
          setRating={setRating}
          ratingList={ratingList}
        />
      ) : (
        <Result
          className="result-nothing"
          status="404"
          title="Nothing Found!"
          subTitle="It seems we can't find what you're looking for."
        />
      )

    const content = hasDate ? searchResult : null

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
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
        className="error"
        message="Error"
        description="Something went wrong. Please try again"
        type="error"
        showIcon
      />
    </>
  )
}
