import React, { Component, Fragment } from 'react'
import { Typography } from 'antd'

const { Text } = Typography

import GenresContext from '../context/genresContext'

export default class GenresMovie extends Component {
  render() {
    const { genresId } = this.props

    return (
      <GenresContext.Consumer>
        {(genresArray) => {
          return (
            <>
              {genresArray.map((genre) => (
                <Fragment key={self.crypto.randomUUID()}>
                  {genresId.map((elem) =>
                    elem === genre.id ? (
                      <Text key={elem} code>
                        {genre.name}
                      </Text>
                    ) : null
                  )}
                </Fragment>
              ))}
            </>
          )
        }}
      </GenresContext.Consumer>
    )
  }
}
