import React, { Component } from 'react'
import { Flex, Layout } from 'antd'

import MovieService from '../services/movieService'

import TabsStatus from './tabsStatus'

const { Content } = Layout

export default class App extends Component {
  movieService = new MovieService()

  state = {
    term: '',
    movieList: [],
    sessionId: '',
  }

  componentDidMount() {
    const createGS = this.movieService.createGuestSession()
    // console.log(createGS)
    this.createSession(createGS)
  }

  async createSession(value) {
    const sessionId = await value.then((response) => response.guest_session_id)
    console.log(sessionId)
    await this.movieService.addRating(1268051, sessionId, 6).then((res) => console.log(res))
    await this.movieService.addRating(1202644, sessionId, 2).then((res) => console.log(res))
    await this.movieService.getRatedMovies(sessionId).then((res) => console.log(res.results))
    // console.log(sessionId)
    this.setState({
      sessionId,
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
    const { movieList } = this.state
    // const visibleItems = this.search(movieList, term) / Для поиска
    // console.log(movieList)
    return (
      <>
        <Flex gap="middle" wrap align="start">
          <Layout>
            <Content
              style={{
                margin: '0 auto',
                width: '1100px',
                minHeight: '100vh',
              }}
            >
              <div
                style={{
                  background: '#FFFFFF',
                  minHeight: '100vh',
                  padding: '21px 7%',
                }}
              >
                <TabsStatus movieList={movieList} />
              </div>
            </Content>
          </Layout>
        </Flex>
      </>
    )
  }
}
