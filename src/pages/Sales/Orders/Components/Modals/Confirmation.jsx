import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
export default function Confirmation(props) {
  const closeModal = () => {
    props.setConfirmModalOpen(false);
  };

  const yesClicked = () => {
    props.yesClickedFunc();
    closeModal();
  };

  return (
    <>
      <Modal
        show={props.confirmModalOpen}
        onHide={closeModal}
        style={{ background: "#4d4d4d57" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{props.message}</span>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-end">
          <button
            className="button-style m-0 me-3"
            style={{ width: "60px" }}
            onClick={yesClicked}
          >
            Yes
          </button>

          <button
            className="button-style m-0"
            style={{ width: "60px", background: "rgb(173, 173, 173)" }}
            onClick={closeModal}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
