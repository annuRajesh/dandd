import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Option } from "informed";
import CustomInput from "./informed/CustomInput";
import InformedSelect from "./informed/InformedSelect";
import { useCreateModalData } from "../customHooks/useCreateModalData";
const CreateModal = ({ columns, handleSubmit }) => {
  const { show, handleSubmitClose, handleClose, handleShow } =
    useCreateModalData(handleSubmit);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitClose}>
          <Modal.Body>
            <CustomInput type="text" name="title" label="title" required />
            <CustomInput type="text" name="description" label="description" placeholder="optional..." />

            <InformedSelect
              name="category"
              defaultValue="Todo"
              label="Category"
            >
              {columns?.map((column) => (
                <Option key={column.name} value={column.name}>
                  {column.name}
                </Option>
              ))}
            </InformedSelect>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Card
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
