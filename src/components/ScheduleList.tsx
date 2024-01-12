import React from 'react';
import Table from 'react-bootstrap/Table';
import { MdDelete } from 'react-icons/md';
import EditScheduleModal from './EditScheduleModal';
import { deleteData } from '../utils/apiService';

interface ScheduleListProps {
  data: Schedule[];
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

const ScheduleList: React.FC<ScheduleListProps> = ({ data, reload }) => {

  const handleDeleteItem = (id: string) => {
    const apiEndpoint = `schedules/${id}`;
    deleteData(apiEndpoint)
    reload(Math.random().toFixed(3));
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.subject}</td>
              <td>{item.frequency} at {item.time}</td>
              <td>
                <button onClick={() => handleDeleteItem(item.id)}><MdDelete /></button>
                <EditScheduleModal
                  schedule={item}
                  reload={reload}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ScheduleList;
