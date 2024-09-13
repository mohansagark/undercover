import { Modal, Row, Col } from "react-bootstrap";
import Button from "../../Button";
import "./styles.scss";

const ConditionalModal = ({
  handleClose,
  show,
  headerBody,
  headerTitle,
  yesText,
  noText,
  handleYes,
}) => {
  return (
    <Modal
      className="conditional-modal"
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
      <Modal.Body>{headerBody}</Modal.Body>
      <Modal.Footer>
        <Row>
          <Col xs={3}>
            <Button
              type={"primary"}
              title={yesText}
              clickMethod={() => {
                handleYes();
                handleClose();
              }}
            />
          </Col>
          <Col xs={3}>
            <Button
              type={"secondary"}
              title={noText}
              clickMethod={handleClose}
            />
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

ConditionalModal.defaultProps = {
  handleClose: () => {},
  show: false,
  headerBody: "",
  headerTitle: "",
  yesText: "Yes",
  noText: "No",
  handleYes: () => {},
};

export default ConditionalModal;
