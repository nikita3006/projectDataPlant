import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postData, patchData } from '../utils/apiService';

interface GenericScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
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

interface FormData {
  title: string;
  description: string;
  subject: string;
  frequency: string;
  repeatOption: string;
  time: string;
}

const GenericScheduleModal: React.FC<GenericScheduleModalProps> = ({ isOpen, onClose, schedule, reload }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    subject: '',
    frequency: 'daily',
    repeatOption: '',
    time: '',
  });

  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('daily');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      frequency: 'daily',
      repeatOption: '',
      time: '',
    });

    setSelectedFrequency('daily');
    setSelectedDay('');
  };

  useEffect(() => {
    if (schedule) {
      setFormData({
        title: schedule.title || '',
        description: schedule.description || '',
        subject: schedule.subject || '',
        frequency: schedule.frequency || 'daily',
        repeatOption: schedule.repeatOption || '',
        time: schedule.time || '',
      });

      setSelectedFrequency(schedule.frequency || 'daily');
      setSelectedDay(schedule.repeatOption || '');
    }
  }, [schedule]);

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDay(event.target.value);
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFrequency(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderRepeatOptions = () => {
    if (selectedFrequency === 'monthly') {
      return (
        <Form.Group className="mb-3" controlId="repeat">
          <Form.Label>Repeat</Form.Label>
          <Form.Control as="select">
            <option value="first-monday">First Monday</option>
            <option value="last-friday">Last Friday</option>
          </Form.Control>
        </Form.Group>
      );
    } else if (selectedFrequency === 'weekly') {
      return (
        <Form.Group className="mb-3" controlId="repeat">
          <Form.Label>Repeat</Form.Label>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <Form.Check
              key={day}
              type="checkbox"
              label={day}
              value={day.toLowerCase()}
              checked={selectedDay === day.toLowerCase()}
              onChange={handleDayChange}
            />
          ))}
        </Form.Group>
      );
    }

    return null;
  };

  const handleCreate = async () => {
    try {
      await postData('schedules', formData);
      reload(Math.random().toFixed(3));
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await patchData(`schedules/${schedule!.id}`, formData);
      reload(Math.random().toFixed(3));
      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{schedule ? 'Edit' : 'Add'} Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={handleInputChange} name="title" value={formData.title} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={handleInputChange} name="description" value={formData.description} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="Enter subject" onChange={handleInputChange} name="subject" value={formData.subject} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="frequency">
            <Form.Label>Frequency</Form.Label>
            {/* @ts-ignore */}
            <Form.Control as="select" onChange={handleFrequencyChange} name="frequency" value={selectedFrequency}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Control>
          </Form.Group>

          {renderRepeatOptions()}

          <Form.Group className="mb-3" controlId="time">
            <Form.Label>Choose Time</Form.Label>
            <Form.Control type="time" step="300" onChange={handleInputChange} name="time" value={formData.time} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={schedule ? handleUpdate : handleCreate}>
          {schedule ? 'Update' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericScheduleModal;
