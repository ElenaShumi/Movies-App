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
    loading: true,
    current: 1,
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

  render() {
    const { movieList, loading, error, current } = this.state

    return (
      <Tabs
        defaultActiveKey="Search"
        size="large"
        centered
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
                <CardsList movieList={movieList} onError={error} onLoaded={loading} />
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
                <CardsList movieList={movieList} onError={error} onLoaded={loading} />
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
        ]}
      />
    )
  }
}
