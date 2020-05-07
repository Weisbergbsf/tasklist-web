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
      };
    case type.FETCH_NEW_TASK_SUCCSESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: state.tasks.elements.concat(action.payload),
        },
      };
    case type.FETCH_DELETE_TASK_SUCCSESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: state.tasks.elements.filter(
            (task) => task.id.toString() !== action.payload
          ),
        },
      };

    case type.FETCH_STATUS_TASK_SUCCSESS:
      const taskIndex = state.tasks.elements.findIndex(
        (task) => task.id.toString() === action.id
      );
      let tasksUpdated = [...state.tasks.elements];
      tasksUpdated[taskIndex] = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          elements: tasksUpdated,
        },
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
