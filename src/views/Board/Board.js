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

  const { loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    setColumns(columnsFromBackend(elements));
  }, [elements]);

  useEffect(() => {
    if (taskId && statusId) {
      dispatch(action.fetchStatusTask(taskId, statusId));
      //setTaskId();
    }
  }, [dispatch, statusId, taskId]);

  const toggleDetails = (event) => {
    setShowDetails(!showDetails);
    setOpenId(event.currentTarget.id);
  };

  const showHandleModal = (e) => {
    clearState();
    const taskId = Number(e.currentTarget.id);
    if (taskId > 0) {
      const { id, title, description, status } = elements.find(
        (obj) => obj.id === taskId
      );
      setTaskId(id);
      setTitle(title);
      setDescription(description);
      setStatusId(status);
      form.setFieldsValue({
        title: title,
        description: description,
      });
    } else {
      form.setFieldsValue({
        title: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const onSubmitForm = () => {
    form.submit();
    if (taskId) {
      dispatch(
        action.fetchUpdateTask(taskId, {
          title: title,
          description: description,
          status: statusId,
        })
      );
    } else {
      dispatch(action.fetchNewTask({ title: title, description: description }));
    }
    setShowModal(false);
  };

  const onDeleteTask = (id) => {
    dispatch(action.fetchDeleteTask(id));
  };

  const handleCancelModal = () => {
    form.resetFields();
    clearState();
    setShowModal(false);
  };

  const clearState = () => {
    setTaskId();
    setTitle("");
    setDescription("");
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
              <div className={styles.column}>
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <Card
                    columnId={columnId}
                    column={column}
                    showDetails={showDetails}
                    openId={openId}
                    onClickDetails={toggleDetails}
                    onClickDelete={(e) => onDeleteTask(e)}
                    onClickUpdate={showHandleModal}
                  />
                )}
              </div>
            </div>
          );
        })}
      </DragDropContext>
      <Modal
        title={taskId ? "Update Task" : "Add new Task"}
        visible={showModal}
        onOk={onSubmitForm}
        onCancel={handleCancelModal}
        okButtonProps={{ disabled: title.length > 2 ? false : true }}
      >
        <Form
          layout="vertical"
          form={form}
          name="basic"
          onFieldsChange={(changedFields, allFields) => {
            setTitle(allFields[0].value || title);
            setDescription(allFields[1].value);
          }}
          initialValues={{
            title: title,
            description: description,
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
