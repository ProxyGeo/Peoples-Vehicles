import React from 'react'
import _ from 'lodash'

class SearchBar extends React.Component {
  state = { keyword: '' }

  componentWillMount() {
    this.passKeyword = _.debounce(this.passKeyword, 500)
  }

  passKeyword() {
    this.props.onSubmit(this.state.keyword)
  }

  _onChange = e => {
    e.preventDefault()
    this.setState({ keyword: e.target.value }, () => {
      this.passKeyword()
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>People Search</label>
            <input
              type="text"
              value={this.state.keyword}
              onChange={this._onChange}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar
