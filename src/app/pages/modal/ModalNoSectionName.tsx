import React, { Component } from 'react';
import {
  Modal, Button, Header, Icon,
} from 'semantic-ui-react';
import '~/app/style/modal.css';

interface Props {
  modalOpen: boolean;
  handleClose: any;
}

class ModalNoSectionName extends Component<Props> {
  render() {
    const { modalOpen, handleClose } = this.props;

    return (
      <>
        <Modal
          open={ modalOpen }
          closeOnDimmerClick={ false }
          onClose={ handleClose }
          size="mini"
        >
          <Modal.Content style={ { textAlign: 'center' } }>
            <Icon
              name="check circle outline"
              size="huge"
              style={ { color: '#fa6768' } }
            />
            <Header>내용을 입력해주세요!</Header>
          </Modal.Content>
          <Modal.Actions style={ { textAlign: 'center' } }>
            <Button onClick={ handleClose }>OK</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ModalNoSectionName;
