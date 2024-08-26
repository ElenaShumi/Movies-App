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
    term: 'return',
    movieList: [],
    movieListRated: [],
    loading: true,
    error: false,
    current: 1,
    currentRated: 1,
    sessionId: '',
    totalResults: 0,
    totalResultsRated: 0,
  }

  onMoviesLoaded = (movies) => {
    this.setState({
      movieList: movies,
      loading: false,
      error: false,
    })
  }

  onMoviesRatedLoaded = (movies) => {
    this.setState({
      movieListRated: movies,
      loading: false,
      error: false,
    })
  }

  onTotalResults = (number) => {
    this.setState({
      totalResults: number,
    })
  }

  onTotalResultsRated = (number) => {
    this.setState({
      totalResultsRated: number,
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
    this.movieService.getTotalResults(movie).then(this.onTotalResults).catch(this.onError)
  }

  onSearchChange = (term) => {
    this.setState({ term, current: 1 })
    this.debouncedGetResponse(term)
  }

  onChangePages = (page) => {
    this.setState({ current: page, loading: true })
    this.debouncedGetResponse(this.state.term, page)
  }

  onChangePagesRated = (page) => {
    this.setState({ currentRated: page, loading: true })
    this.onRatedMovies(this.props.sessionId, page)
  }

  toggleRating(arr, id, value) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, ['ratingValue']: value }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleRating = (id, value) => {
    this.setState(({ movieList }) => {
      return {
        todoData: this.toggleRating(movieList, id, value),
      }
    })
  }

  onRatedMovies = (id, page) => {
    this.movieService
      .getRatedMovies(id, page)
      .then((res) => res.results)
      .then(this.onMoviesRatedLoaded)
      .catch(this.onError)
    this.movieService.getTotalResultsRated(id, page).then(this.onTotalResultsRated).catch(this.onError)
  }

  render() {
    const { movieList, movieListRated, loading, error, current, currentRated, totalResults, totalResultsRated } =
      this.state
    const { sessionId, ratingList, setRating } = this.props
    return (
      <Tabs
        defaultActiveKey="Search"
        size="large"
        centered
        onChange={() => this.onRatedMovies(sessionId, currentRated)}
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
                  setRating={setRating}
                  ratingList={ratingList}
                  error={error}
                  loading={loading}
                  onToggleRating={this.onToggleRating}
                  sessionId={sessionId}
                />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={totalResults}
                  showSizeChanger={false}
                  pageSize={20}
                  onChange={this.onChangePages}
                  current={current}
                  className="pagination"
                />
              </>
            ),
          },
          {
            label: 'Rated',
            key: 'Rated',
            children: (
              <>
                <CardsList movieList={movieListRated} error={error} onLoaded={loading} />
                <Pagination
                  align="center"
                  defaultCurrent={1}
                  total={totalResultsRated}
                  onChange={this.onChangePagesRated}
                  showSizeChanger={false}
                  pageSize={20}
                  current={currentRated}
                  className="pagination"
                />
              </>
            ),
          },
        ]}
      />
    )
  }
}
