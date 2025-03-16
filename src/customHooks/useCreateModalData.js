import { useState } from "react";

export const useCreateModalData = (handleSubmit) => {
  const [show, setShow] = useState(false);

  const handleSubmitClose = ({ values }) => {
    handleSubmit(values);
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return { show, handleSubmitClose, handleClose, handleShow };
};
