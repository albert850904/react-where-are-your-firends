import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from './Button';

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  onClear: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default ErrorModal;
