import React from 'react'
import { Button, Modal, List } from 'semantic-ui-react'

class VehiclesModal extends React.Component {
  close = () => {
    this.props.onClose()
  }

  render() {
    const { open, userName, vehicles } = this.props

    return (
      <Modal open={open} onClose={this.close}>
        <Modal.Header>{`${userName} Vehicle(s)`}</Modal.Header>
        <Modal.Content>
          <List divided relaxed>
            {vehicles.map((vehicle, i) => {
              return [
                <List.Item key={i}>
                  <List.Icon name="car" size="huge" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{vehicle.name}</List.Header>
                    <List.Description>{vehicle.model}</List.Description>
                    <List.Description>{vehicle.manufacturer}</List.Description>
                    <List.Description>{vehicle.vehicle_class}</List.Description>
                  </List.Content>
                </List.Item>
              ]
            })}
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default VehiclesModal
