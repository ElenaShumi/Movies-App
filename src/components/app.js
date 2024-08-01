import React, { Component } from 'react'
import { Flex, Layout } from 'antd'

import TabsStatus from './tabsStatus'

const { Content } = Layout

export default class App extends Component {
  state = {
    term: '',
    movieList: [],
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
