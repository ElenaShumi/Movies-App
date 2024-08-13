import React, { Component } from 'react'
import { Tabs, Pagination } from 'antd'
import debounce from 'lodash.debounce'

import MovieService from '../services/movieService'

import SearchPanel from './searchPanel'
import CardsList from './cardsList'

export default class TabsStatus extends Component {
  movieService = new MovieService()

  componentDidMount() {
    this.updateMovies()
  }

  state = {
    term: '',
    movieList: [],
    movieListRated: [],
    loading: true,
    current: 1,
    currentRated: 1,
    sessionId: '',
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

  debouncedGetResponse = debounce((value, page) => this.updateMovies(value, page), 300)

  updateMovies(movie, page) {
    this.movieService.getMovies(movie, page).then(this.onMoviesLoaded).catch(this.onError)
  }

  onSearchChange = (term) => {
    this.setState({ term })
    this.debouncedGetResponse(term)
  }

  onChangePages = (page) => {
    this.setState({ current: page })
    this.debouncedGetResponse(this.state.term, page)
  }

  onChangePagesRated = (page) => {
    this.setState({ currentRated: page })
    this.onRatedMovies()
  }

  toggleRating(arr, id, value) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, ['ratingValue']: value }
    console.log(newItem)
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleRating = (id, value) => {
    console.log('Work 1 ' + value)
    this.setState(({ movieList }) => {
      return {
        todoData: this.toggleRating(movieList, id, value),
      }
    })
  }

  onRatedMovies = () => {
    this.movieService
      .getRatedMovies(this.props.sessionId, this.state.currentRated)
      .then((res) => this.setState({ movieListRated: res.results }))
  }

  render() {
    const { movieList, movieListRated, loading, error, current, currentRated } = this.state
    const { sessionId } = this.props

    return (
      <Tabs
        defaultActiveKey="Search"
        size="large"
        centered
        onChange={this.onRatedMovies}
        indicator={{
          size: (origin) => origin + 30,
          align: 'center',
        }}
        items={[
          {
            label: 'Search',
            key: 'Search',
            children: (
              <>
                <SearchPanel onSearchChange={this.onSearchChange} />
                <CardsList
                  movieList={movieList}
                  onError={error}
                  loading={loading}
                  onToggleRating={this.onToggleRating}
                  sessionId={sessionId}
                />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={50}
                  onChange={this.onChangePages}
                  current={current}
                  style={{ marginTop: '30px' }}
                />
              </>
            ),
          },
          {
            label: 'Rated',
            key: 'Rated',
            children: (
              <>
                <CardsList movieList={movieListRated} onError={error} onLoaded={loading} />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={50}
                  onChange={this.onChangePagesRated}
                  current={currentRated}
                  style={{ marginTop: '30px' }}
                />
              </>
            ),
          },
        ]}
      />
    )
  }
}
