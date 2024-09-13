import { Modal } from "react-bootstrap";
import Button from "../../Button";


const InformationModal = ({ handleClose, show, innerCompoenent }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{innerCompoenent()}</Modal.Body>
      <Modal.Footer>
        <Button title="Okay" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default InformationModal;
