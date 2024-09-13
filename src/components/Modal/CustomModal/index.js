import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  const { handleClose, show, innerComponent, headerTitle } = props;
  return (
    <Modal
      {...props}
      show={show}
      onHide={handleClose}
      animation={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{innerComponent()}</Modal.Body>
    </Modal>
  );
};

CustomModal.defaultProps = {
  handleClose: () => {},
  show: false,
  innerComponent: () => {},
  headerTitle: "Custom Modal",
};

export default CustomModal;
