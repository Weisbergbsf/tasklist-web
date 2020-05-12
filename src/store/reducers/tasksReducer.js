import * as type from "../types";

const initialState = {
  tasks: [],
  loading: false,
  errors: null,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case type.FETCH_TASK_START:
      return {
        ...state,
        loading: true,
      };

    case type.FETCH_TASK_LIST_SUCCSESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case type.FETCH_NEW_TASK_SUCCSESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: state.tasks.elements.concat(action.payload),
        },
        loading: false,
      };
    case type.FETCH_DELETE_TASK_SUCCSESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: state.tasks.elements.filter(
            (task) => task.id !== action.payload
          ),
        },
        loading: false,
      };

    case type.FETCH_STATUS_TASK_SUCCSESS:
      const statusTaskIndex = state.tasks.elements.findIndex(
        (task) => task.id.toString() === action.id
      );
      let tasksUpdateStatus = [...state.tasks.elements];
      tasksUpdateStatus[statusTaskIndex] = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: tasksUpdateStatus,
        },
        loading: false,
      };
    case type.FETCH_TASK_UPDATE_SUCCSESS:
      const taskIndex = state.tasks.elements.findIndex(
        (task) => task.id === action.id
      );
      let tasksUpdated = [...state.tasks.elements];
      tasksUpdated[taskIndex] = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: tasksUpdated,
        },
        loading: false,
      };

    case type.FETCH_TASK_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
