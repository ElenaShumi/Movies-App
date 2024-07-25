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
                <CardsList />
              </div>
            </Content>
          </Layout>
        </Flex>
      </>
    )
  }
}
