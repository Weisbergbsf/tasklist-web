import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";

import { DragDropContext } from "react-beautiful-dnd";
import { Modal, Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions/tasksAction";

import { onDragEnd } from "./onDragEnd";
import { columnsFromBackend } from "./columnsFromBackend";

import styles from "./styles.module.css";

const Board = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [columns, setColumns] = useState(columnsFromBackend());
  const [statusId, setStatusId] = useState();
  const [taskId, setTaskId] = useState();
  const [openId, setOpenId] = useState(0);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.fetchTaskList());
  }, [dispatch]);

  const { elements } = useSelector((state) => state.tasks.tasks);
  useEffect(() => {
    setColumns(columnsFromBackend(elements));
  }, [elements]);

  useEffect(() => {
    if (taskId && statusId) {
      dispatch(action.fetchStatusTask(taskId, statusId));
    }
  }, [dispatch, statusId, taskId]);

  const toggleDetails = (event) => {
    setShowDetails(!showDetails);
    setOpenId(event.currentTarget.id);
  };

  const showHandleModal = () => {
    setShowModal(true);
  };

  const onSubmitForm = () => {
    form.submit();
    dispatch(action.fetchNewTask({ title: title, description: description }));
    setShowModal(false);
  };

  const onDeleteTask = (event) => {
    dispatch(action.fetchDeleteTask(event.currentTarget.id));
  };

  const handleCancelModal = (e) => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result, columns, setColumns);
          setStatusId(result.destination.droppableId);
          setTaskId(result.draggableId);
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className={styles.containerColumn} key={columnId}>
              <div>
                <span className={styles.nameColumn}>{column.name}</span>
                {columnId === "1" && (
                  <button className={styles.button} onClick={showHandleModal}>
                    +
                  </button>
                )}
              </div>
              <div style={{ margin: 8 }}>
                <Card
                  columnId={columnId}
                  column={column}
                  showDetails={showDetails}
                  openId={openId}
                  onClick={toggleDetails}
                  onClickDelete={onDeleteTask}
                  //TODO: Update Task
                  onClickUpdate={showHandleModal}
                />
              </div>
            </div>
          );
        })}
      </DragDropContext>
      <Modal
        title="Add new Task"
        visible={showModal}
        onOk={onSubmitForm}
        onCancel={handleCancelModal}
        okButtonProps={{ disabled: title.length > 2 ? false : true }}
      >
        <Form
          layout="vertical"
          form={form}
          name="basic"
          onFinish={() => {}}
          onFinishFailed={() => {}}
          onFieldsChange={(changedFields, allFields) => {
            setTitle(allFields[0].value);
            setDescription(allFields[1].value);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                min: 3,
                whitespace: true,
                message: "Title is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Board;
