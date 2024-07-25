import React, { Component } from 'react'
import { Flex, Card, Typography, Col, Spin, Alert } from 'antd'
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
    movieList: [],
    loading: true,
  }

  constructor() {
    super()
    this.updateMovies()
  }

  onMoviesLoaded = (movies) => {
    this.setState({
      movieList: movies,
      loading: false,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  updateMovies() {
    this.movieService.getAllMovies().then(this.onMoviesLoaded).catch(this.onError)
  }

  truncateOverview(str) {
    return str.length > 190 ? str.slice(0, str.indexOf(' ', 190)) + '…' : str
  }

  render() {
    const { movieList, loading, error } = this.state

    const hasDate = !(loading || error)

    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spiner /> : null
    const content = hasDate ? <MoviesView movieList={movieList} /> : null

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    )
  }
}

const MoviesView = ({ movieList }) => {
  let truncateOverview = (str) => {
    return str.length > 190 ? str.slice(0, str.indexOf(' ', 190)) + '…' : str
  }
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
                <Paragraph>{truncateOverview(movie.overview)}</Paragraph>
              </Flex>
            </Flex>
          </Card>
        </Col>
      ))}
    </>
  )
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
