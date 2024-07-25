import React, { Component } from 'react'
import { Flex, Card, Typography, Col } from 'antd'
import { format } from 'date-fns'

import MovieService from '../services/movieService'

const { Text, Paragraph, Title } = Typography

const cardStyle = {
  width: '451px',
  height: '279px',
}

const imgStyle = {
  display: 'block',
  width: '35%',
  height: '279px',
}

export default class MovieCard extends Component {
  movieService = new MovieService()

  state = {
    title: null,
    overview: null,
    releaseDate: null,
    movieList: [],
  }

  constructor() {
    super()
    this.updateMovies()
  }

  updateMovies() {
    this.movieService.getAllMovies().then((res) => {
      this.setState({
        movieList: res,
      })
    })
  }

  truncateOverview(str) {
    return str.length > 190 ? str.slice(0, str.indexOf(' ', 190)) + '…' : str
  }

  render() {
    const { movieList } = this.state
    return (
      <>
        {movieList.map((movie) => (
          <Col key={movie.id} span={12}>
            <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
              <Flex justify="start">
                <img alt="avatar" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={imgStyle} />
                <Flex vertical style={{ padding: '10px 20px' }}>
                  <Title level={4}>{movie.title}</Title>
                  <Paragraph>
                    {movie.release_date ? format(new Date(movie.release_date), 'MMMM dd, yyyy') : ' '}
                  </Paragraph>
                  <Paragraph>
                    <Text code>Action</Text>
                    <Text code>Drama</Text>
                  </Paragraph>
                  <Paragraph>{this.truncateOverview(movie.overview)}</Paragraph>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </>
    )
  }
}
