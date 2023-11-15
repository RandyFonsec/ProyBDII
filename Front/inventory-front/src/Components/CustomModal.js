import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';


function CustomModal({children, state, close}){
  const [smShow, setSmShow] = useState(state);

  return (
    <>
      
      <Modal
        centered
        animation={false}
        show={smShow}
        onHide={() => close()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
		 <div style = {{display : 'flex', justifyContent:'center', margin:'1%'}}>

		 {children}

		 </div>
        </Modal.Body>
      </Modal>
      
    </>
  );

}

export default CustomModal;