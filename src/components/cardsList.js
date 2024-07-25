import React, { Component } from 'react'
import { Row } from 'antd'

import MovieCard from './movieCard'

export default class CardsList extends Component {
  render() {
    return (
      <>
        <Row gutter={[36, 37]}>
          <MovieCard />
        </Row>
      </>
    )
  }
}
