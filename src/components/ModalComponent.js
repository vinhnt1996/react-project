import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addUser } from "./services/fetchUser";
import { useState } from "react";
import { toast } from "react-toastify";
const ModalComponent = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, handleUpdateTable } = props;
  const handleAddUser = async () => {
    if (!name || !job) {
      alert("Missing data");
      return;
    }
    let res = await addUser(name, job);
    if (res && res.data.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Add new memeber success");
      handleUpdateTable({
        first_name: name,
        id: res.data.id,
      });
    } else {
      toast.error("An error...");
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
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalComponent;
