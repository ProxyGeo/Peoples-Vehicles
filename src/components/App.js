import React from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import PeopleTable from './PeopleTable'
import Spinner from './Spinner'

class App extends React.Component {
  state = { isLoading: false, loadingMsg: '', peoples: [], nextUrl: null }

  componentDidMount() {
    this.loadPeoples()
  }

  loadPeoples = async (keyword = '', isLoadNext = false) => {
    const params = keyword ? { search: keyword } : {}
    const url = isLoadNext ? this.state.nextUrl : 'https://swapi.co/api/people/'
    this.setState({
      isLoading: true,
      loadingMsg: 'Loading Peoples Information...'
    })

    const response = await axios.get(url, {
      params: params
    })

    this.setState(
      {
        peoples: !isLoadNext
          ? response.data.results
          : this.state.peoples.concat(response.data.results),
        nextUrl: response.data.next ? response.data.next : null
      },
      () => this.setState({ isLoading: false, loadingMsg: '' })
    )
  }

  onProcessing = (isLoading, message) => {
    this.setState({ isLoading: isLoading, loadingMsg: message })
  }

  render() {
    const { isLoading, loadingMsg, peoples, nextUrl } = this.state
    return (
      <div className="ui container" style={{ margin: '15px 0' }}>
        <SearchBar onSubmit={this.loadPeoples} />
        <div className="ui segment">
          <PeopleTable
            onProcessing={this.onProcessing}
            peoples={peoples}
            nextUrl={nextUrl}
            isLoading={isLoading}
            onClick={this.loadPeoples}
          />
          {isLoading ? <Spinner message={loadingMsg} /> : null}
        </div>
      </div>
    )
  }
}

export default App
