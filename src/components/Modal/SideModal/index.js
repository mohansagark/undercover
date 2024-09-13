import React from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";

import "./styles.scss";
const Side = (props) => {
  const { show, closeModal, insideComponents, theme, isNotcloseButton } = props;
  return (
    <Modal
      show={show}
      onHide={closeModal}
      dialogClassName="modal-bottom"
      backdrop="static"
      backdropClassName={
        theme === "dark" ? "darkBackGround" : "lightBackGround"
      }
      keyboard={false}
    >
      {!isNotcloseButton ? (
        <div className="modalCloseButton">
          <div className="modalCloseCricle" onClick={closeModal}>
            <MdOutlineClose />
          </div>
        </div>
      ) : null}
      <div className={!isNotcloseButton ? "modalViewBottom" : null}>
        {insideComponents()}
      </div>
    </Modal>
  );
};

Side.defaultProps = {
  show: false,
  closeModal: () => {},
  insideComponents: () => {},
  theme: "dark",
  isNotcloseButton: false,
};

export default Side;
