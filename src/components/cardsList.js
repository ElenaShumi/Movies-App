import React, { Component } from 'react'
import { Row } from 'antd'

import MovieCard from './movieCard'

export default class CardsList extends Component {
  render() {
    const { movieList, onToggleRating, loading, sessionId } = this.props
    return (
      <>
        <Row gutter={[36, 37]}>
          <MovieCard movieList={movieList} onToggleRating={onToggleRating} loading={loading} sessionId={sessionId} />
        </Row>
      </>
    )
  }
}
