import axios from "axios";
import * as type from "../types";
import { fetchStart, fetchSuccess, fetchError } from "./utils/defaultMethods";
import { API_ROOT } from "./utils/api-config";

export const fetchTaskList = () => (dispatch) => {
  dispatch(fetchStart(type.FETCH_TASK_START));
  axios
    .get(API_ROOT + "/tasks")
    .then((res) => {
      dispatch(fetchSuccess(type.FETCH_TASK_LIST_SUCCSESS, res.data));
    })
    .catch((error) => {
      dispatch(fetchError(type.FETCH_TASK_FAIL, error));
    });
};

export const fetchNewTask = (task) => (dispatch) => {
  axios
    .post(API_ROOT + "/tasks", task)
    .then((res) => {
      dispatch(fetchSuccess(type.FETCH_NEW_TASK_SUCCSESS, res.data.result));
    })
    .catch((error) => {
      dispatch(fetchError(type.FETCH_TASK_FAIL, error));
    });
};

export const fetchDeleteTask = (id) => (dispatch) => {
  axios
    .delete(API_ROOT + `/tasks/${id}`)
    .then(() => {
      dispatch(fetchSuccess(type.FETCH_DELETE_TASK_SUCCSESS, id));
    })
    .catch((error) => {
      dispatch(fetchError(type.FETCH_TASK_FAIL, error));
    });
};

export const fetchStatusTask = (id, status) => (dispatch) => {
  axios
    .patch(API_ROOT + `/tasks/${id}`, { status: status })
    .then((res) => {
      dispatch(
        fetchSuccess(type.FETCH_STATUS_TASK_SUCCSESS, res.data.result, id)
      );
    })
    .catch((error) => {
      dispatch(fetchError(type.FETCH_TASK_FAIL, error));
    });
};

export const fetchUpdateTask = (id, task) => (dispatch) => {
  axios
    .put(API_ROOT + `/tasks/${id}`, task)
    .then((res) => {
      dispatch(
        fetchSuccess(type.FETCH_TASK_UPDATE_SUCCSESS, res.data.result, id)
      );
    })
    .catch((error) => {
      dispatch(fetchError(type.FETCH_TASK_FAIL, error));
    });
};
