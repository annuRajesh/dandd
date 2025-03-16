import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDragDrop } from '../customHooks/usedragDrop';

function DeleteModal({id,handleDelete}) {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>setOpen(true)
  const handleClose=()=>setOpen(false)
  return (
    <>
    <Button variant="primary" type='button' onClick={(e)=>{e.stopPropagation()
    e.preventDefault()
      handleOpen()
    }}>
      Delete
    </Button>

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        No
        </Button>
        <Button variant="primary" onClick={()=>{
          handleDelete(id)
          handleClose()
        }}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  </>

  );
}

export default DeleteModal;