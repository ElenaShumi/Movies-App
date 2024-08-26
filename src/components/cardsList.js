import React, { Component } from 'react'
import { Row } from 'antd'

import MovieCard from './movieCard'

export default class CardsList extends Component {
  render() {
    const { movieList, onToggleRating, loading, error, sessionId, movieListRated, setRating, ratingList } = this.props
    return (
      <>
        <Row gutter={[36, 37]}>
          <MovieCard
            movieList={movieList}
            onToggleRating={onToggleRating}
            loading={loading}
            error={error}
            setRating={setRating}
            ratingList={ratingList}
            sessionId={sessionId}
            movieListRated={movieListRated}
          />
        </Row>
      </>
    )
  }
}
