import React from 'react'
import Moment from 'moment'
import axios from 'axios'
import { Button, Table } from 'semantic-ui-react'
import VehiclesModal from './VehiclesModal'

class PeopleTable extends React.Component {
  state = { open: false, vehicles: [] }

  onViewVehicles = urls => {
    if (urls.length) {
      this.props.onProcessing(true, 'Loading Vehicles...')
      let promises = []
      let vehicles = []

      urls.map(url => promises.push(axios.get(url)))

      axios.all(promises).then(results => {
        results.map(response => vehicles.push(response.data))
        this.setState({ vehicles: vehicles })
        setTimeout(() => {
          this.props.onProcessing(false, '')
          this.setState({ open: true })
        })
      })
    }
  }

  onClose = () => {
    this.setState({ open: false })
  }

  loadMore = () => {
    this.props.onClick('', true)
  }

  render() {
    const { peoples, isLoading, nextUrl } = this.props
    const { open, vehicles } = this.state
    let isDisabled = isLoading || !nextUrl ? true : false

    return (
      <Table compact celled definition>
        <Table.Header className="fixed-header">
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>Weight</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Update Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {peoples.map((user, i) => {
            return [
              <Table.Row key={i}>
                <Table.Cell collapsing>
                  <Button
                    className={`${!user.vehicles.length ? 'disabled' : ''}`}
                    style={{ width: '100%' }}
                    onClick={e => this.onViewVehicles(user.vehicles)}
                  >
                    {!user.vehicles.length ? 'No Available' : 'View Vehicle(s)'}
                  </Button>
                  <VehiclesModal
                    onClose={this.onClose}
                    open={open}
                    vehicles={vehicles}
                    userName={user.name}
                  />
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.height}</Table.Cell>
                <Table.Cell>{user.mass}</Table.Cell>
                <Table.Cell>{user.gender}</Table.Cell>
                <Table.Cell>
                  {Moment(user.edited).format('YYYY-MM-DD HH:mm:ss')}
                </Table.Cell>
              </Table.Row>
            ]
          })}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell className="center aligned" colSpan="6">
              <Button
                className={`${isDisabled ? 'disabled' : ''}`}
                onClick={this.loadMore}
                primary
              >
                {`${nextUrl ? 'LOAD MORE PEOPLES' : 'ALL PEOPLES LOADED'}`}
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default PeopleTable
