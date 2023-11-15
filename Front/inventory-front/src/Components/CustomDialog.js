import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const style = {
  background : '#f0f78b',
}


function CustomDialog({title, message, state, handler}){

  const [show, setShow] = useState(state);

  const handleClose = () => handler(false);
  const handleShow = () => handler(true);

  return (
    <>

      <Modal 
      show={show}
      centered
      animation={false}
      show={state} 
      onHide={handleClose}

      >
        <Modal.Body  style = {style} closeButton>
          <Modal.Title>{title}</Modal.Title>

          {message}

        </Modal.Body>

        

      </Modal>
    </>
  );
}

export default CustomDialog;