import React, { useState } from 'react';
import GenericScheduleModal from './GenericScheduleModal';
import { IoIosAddCircle } from 'react-icons/io';

interface AddScheduleModalProps {
  reload: (value: string) => void;
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({ reload }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <button onClick={handleShow}>
        <IoIosAddCircle /> Add
      </button>
      <GenericScheduleModal isOpen={show} onClose={handleClose} schedule={null} reload={reload} />
    </>
  );
};

export default AddScheduleModal;
