import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "./services/fetchUser";
const ModalDeleteComponent = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;
  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && res.status === 204) {
      handleClose();
      toast.success("Delete User Success");
      handleDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Error Delete User");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            This action can't be undone! Do you want to delete this user?
            <br />
            <b>email="{dataUserDelete.email}"</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDeleteComponent;
