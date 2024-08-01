import React, { Component } from 'react'
import { Tabs } from 'antd'
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

  debouncedGetResponse = debounce((value) => this.updateMovies(value), 300)

  updateMovies(movie) {
    this.movieService.getMovies(movie).then(this.onMoviesLoaded).catch(this.onError)
  }

  onSearchChange = (term) => {
    this.setState({ term })
    this.debouncedGetResponse(term)
  }

  render() {
    const { movieList, loading, error } = this.state

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
              </>
            ),
          },
          {
            label: 'Rated',
            key: 'Rated',
            children: (
              <>
                <CardsList movieList={movieList} onError={error} onLoaded={loading} />
              </>
            ),
          },
        ]}
      />
    )
  }
}
