import React, { Component } from 'react'
import { Flex, Layout } from 'antd'

import MovieService from '../services/movieService'
import GenresContext from '../context/genresContext'

import TabsStatus from './tabsStatus'

const { Content } = Layout

export default class App extends Component {
  movieService = new MovieService()

  state = {
    term: '',
    movieList: [],
    arrGenres: [],
    sessionId: '',
  }

  componentDidMount() {
    const createGS = this.movieService.createGuestSession()
    this.createSession(createGS)

    const arrGenres = this.movieService.getGenreMovieList()
    this.createArrayGenres(arrGenres)
  }

  async createSession(value) {
    const sessionId = await value.then((response) => response.guest_session_id)
    this.setState({
      sessionId,
    })
  }

  async createArrayGenres(value) {
    const arrGenres = await value.then((response) => response.genres)
    this.setState({
      arrGenres,
    })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }
  onSearchChange = (term) => {
    this.setState({ term })
  }

  render() {
    const { movieList, sessionId, arrGenres } = this.state

    return (
      <>
        <GenresContext.Provider value={arrGenres}>
          <Flex gap="middle" wrap align="start">
            <Layout>
              <Content className="main">
                <div className="main_container">
                  <TabsStatus movieList={movieList} sessionId={sessionId} />
                </div>
              </Content>
            </Layout>
          </Flex>
        </GenresContext.Provider>
      </>
    )
  }
}
