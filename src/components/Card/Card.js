import React, { useState, useEffect } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { Row, Divider, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import moment from "moment";
import styles from "./styles.module.css";

const Card = (props) => {
  const [color, setColor] = useState("blue");
  const {
    showDetails,
    openId,
    onClickDetails,
    onClickDelete,
    onClickUpdate,
    refCard,
    columnId,
    column,
  } = props;

  useEffect(() => {
    if (columnId === "2") {
      setColor("orange");
    }
    if (columnId === "3") {
      setColor("green");
    }
  }, [color, columnId]);

  const dateStatus = (status, date) => {
    if (status === 1) {
      return (
        <span>
          Criado em:
          {moment(date.createAt).format("DD/MM/YYYY HH:mm")}
        </span>
      );
    }
    if (status === 2) {
      return (
        <span>
          Iniciado em:
          {moment(date.updateAt).format("DD/MM/YYYY HH:mm")}
        </span>
      );
    } else {
      return (
        <span>
          Concluído em:
          {moment(date.doneAt).format("DD/MM/YYYY HH:mm")}
        </span>
      );
    }
  };

  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.container}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
            }}
          >
            {column.items.map((item, index) => {
              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        className={styles.card}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          style={{
                            position: "absolute",
                            zIndex: -1,
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: 7,
                            backgroundColor: color,
                          }}
                        />
                        <Row justify="space-between">
                          <div
                            ref={refCard}
                            id={item.id}
                            className={
                              showDetails && item.id.toString() === openId
                                ? `${styles.card__title} ${styles.card__title_is_open}`
                                : styles.card__title
                            }
                            onClick={onClickDetails}
                          >
                            {item.title}
                          </div>
                        </Row>
                        {showDetails && item.id.toString() === openId && (
                          <div className={styles.card__details}>
                            {item.description}
                          </div>
                        )}
                        <Row>{dateStatus(item.status, item)}</Row>
                        <Divider />
                        <Row justify="end">
                          <Popconfirm
                            id={item.id}
                            title="Are you sure delete this task?"
                            onConfirm={() => onClickDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined className={styles.buttonDelete} />
                          </Popconfirm>

                          <EditOutlined
                            className={styles.buttonUpdate}
                            id={item.id}
                            onClick={onClickUpdate}
                          />
                        </Row>
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Card;
