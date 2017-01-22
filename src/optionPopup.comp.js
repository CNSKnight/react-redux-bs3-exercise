import React from 'react';
import { Modal } from 'react-bootstrap';
import OptionForm from './optionForm.comp';
import { isNumber } from 'lodash';

const OptionPopup = (props) => {
  return (
    <Modal
      bsSize="small"
      show={isNumber(props.selected)}
      onHide={() => {
        props.onPopupClose()
      } }
      container={document.body}
      aria-labelledby="apt-title"
      >
      <Modal.Header closeButton>
        <Modal.Title id="apt-title">{props.appointments.sets[props.selected]
          ? 'Editing: ' + props.appointments.data[props.selected].name
          : 'Creating New Appointment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="text-center">{props.appointments.labels[props.selected]}</h3>
        <OptionForm {...props} />
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
      </Modal.Footer>
    </Modal>
  );
};

export default OptionPopup;
