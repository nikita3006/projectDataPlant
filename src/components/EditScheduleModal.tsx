import React, { useState } from 'react';
import GenericScheduleModal from './GenericScheduleModal';
import { MdEdit } from 'react-icons/md';

interface EditScheduleModalProps {
  schedule: Schedule;
  reload: (value: string) => void;
}

interface Schedule {
  id: string;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeatOption: string;
  time: string;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ schedule, reload }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <button onClick={handleShow}>
        <MdEdit />
      </button>
      <GenericScheduleModal isOpen={show} onClose={handleClose} schedule={schedule} reload={reload} />
    </>
  );
};

export default EditScheduleModal;
