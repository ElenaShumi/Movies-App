import React, { Component } from 'react'
import { Input } from 'antd'

export default class SearchPanel extends Component {
  state = {
    term: '',
  }

  onSearchChange = (e) => {
    const term = e.target.value
    this.setState({ term })
    this.props.onSearchChange(term)
  }

  render() {
    return (
      <Input
        type="text"
        placeholder="Type to search..."
        value={this.state.term}
        onChange={this.onSearchChange}
        className="search-panel"
      />
    )
  }
}
