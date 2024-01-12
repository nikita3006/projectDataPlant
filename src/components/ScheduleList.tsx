import React from 'react';
import Table from 'react-bootstrap/Table';
import { MdDelete } from 'react-icons/md';

import { deleteData } from '../utils/apiService';

interface ScheduleListProps {
  data: Schedule[];
  
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

const ScheduleList: React.FC<ScheduleListProps> = ({ data }) => {

  const handleDeleteItem = (id: string) => {
    const apiEndpoint = `schedules/${id}`;
    deleteData(apiEndpoint)
    ;
  };

  return (
    <>
      <Table striped bordered hover >
        <thead style={{backgroundColor:"black", color:"white"}}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Subject</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody style={{color:"black"}}>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.subject}</td>
              <td>{item.frequency} at {item.time}</td>
              <td>
                <button onClick={() => handleDeleteItem(item.id)}><MdDelete /></button>
               <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ScheduleList;
