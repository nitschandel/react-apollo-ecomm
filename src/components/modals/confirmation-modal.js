import React, {Component} from 'react';
import {Modal, ModalHeader,  ModalBody, Button} from 'reactstrap';

//Constants
import Styles from '../../constants/styles';

class ConfirmationModal extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.onCancel();
  }

  render() {
    var { alertHeading, alertText} = this.props;

    return (
      <Modal
        isOpen={true}
        toggle={this.toggle}
        size="sm"
        zIndex={Styles.Z_INDEX.modal}>
        <ModalHeader toggle={this.toggle}>
          {alertHeading}
        </ModalHeader>
        <ModalBody className="p-0">
          <div className="padding">
            <h1 className="text-center"><i className="fa fa-exclamation-triangle" /></h1>
            <h5 className="text-center">
              {alertText}
            </h5>
          </div>
          <Button color="primary" block onClick={() => {this.props.onConfirm();}}>YES</Button>
        </ModalBody>
      </Modal>
    );
  }
}


export default ConfirmationModal;