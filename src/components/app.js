import React, { Component } from 'react'
import { Flex, Layout } from 'antd'

import CardsList from './cardsList'

const { Content } = Layout

export default class App extends Component {
  render() {
    return (
      <>
        <Flex gap="middle" wrap align="start">
          <Layout>
            <Content
              style={{
                margin: '0 auto',
                width: '1100px',
              }}
            >
              <div
                style={{
                  background: '#FFFFFF',
                  minHeight: 280,
                  padding: '21px 7%',
                }}
              >
                <CardsList />
              </div>
            </Content>
          </Layout>
        </Flex>
      </>
    )
  }
}
