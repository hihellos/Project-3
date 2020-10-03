import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Table } from 'reactstrap';
import API from '../../utils/API';

const RoomModal = (props) => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [task, setNewTask] = useState({});

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTask({[name]: value});
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("props: ", props.value._id);
    console.log("task: ", task);

    API.addTask(props.value._id, task)
    .then(res => {
      console.log("result: ", res);
    })
    .catch(res => {
      console.log("error ", res);
    })
  };

  function deleteTask(taskId) {
    const roomId = props.value._id;
    const taskObj = {
      id: taskId 
    }
    console.log("roomId, taskId", roomId, taskObj)
    API.deleteTask(roomId, taskObj)
      .then(res => {
        console.log("result: ", res);
      })
      .catch(res => {
      console.log("error ", res);
      })
  };



  return (
    <div>
      <Button style={{backgroundColor:"#ff6f5b", borderColor:"#ff6f5b"}} onClick={toggle}>{props.value.roomName}</Button>
      <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>{props.value.roomName} Checklist</ModalHeader>
            <ModalBody>
                        <Table>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                            <th>Complete</th>
                            <th>Task</th>
                            <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.value.tasks.map((task) => (
                                <tr style={{textAlign:'center'}}>
                                  <td>
                                    {(task.isFixed) ? (<Input type="checkbox" checked/>) : (<Input type="checkbox"/>) }
                                  </td>
                                  <td>{task.taskName}</td>
                                  <td {...props} role="button" onClick={() => deleteTask(task._id)}>✗</td>
                                </tr>
                            ))}
                        </tbody>  
                        </Table>
                <br />
            <Button color="success" onClick={toggleNested}>Add Task</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader>New Task:</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Input onChange={handleInputChange} placeholder="New task here..." type="textarea" name="text" id="newTask" />
                                </FormGroup>
                            </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleFormSubmit}>Save</Button>{' '}
                            <Button color="secondary" onClick={toggleNested}>Close</Button>
                        </ModalFooter>
                    </Modal>
            </ModalBody>
          <ModalFooter>
                <Button color="primary" onClick={toggle}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
    </div>
  );
}

export default RoomModal;