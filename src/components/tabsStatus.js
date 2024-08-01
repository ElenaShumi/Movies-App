import React, { Component } from 'react'
import { Tabs } from 'antd'

import SearchPanel from './searchPanel'
import CardsList from './cardsList'

export default class TabsStatus extends Component {
  render() {
    const { movieList } = this.props
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
                <SearchPanel />
                <CardsList movieList={movieList} />
              </>
            ),
          },
          {
            label: 'Rated',
            key: 'Rated',
            children: (
              <>
                <CardsList movieList={movieList} />
              </>
            ),
          },
        ]}
      />
    )
  }
}
