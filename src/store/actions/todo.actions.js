import {
  SET_TODO_LIST,
  GET_TODO_LIST,
  RESET_TODO_LIST,
  UPDATE_TODO_ITEM,
} from "./types";

export const getTodoList = () => {
  return {
    type: GET_TODO_LIST,
  };
};

export const setTodoList = (payload) => {
  return {
    type: SET_TODO_LIST,
    payload,
  };
};

export const updateToDoItemStatus = (payload) => {
  return {
    type: UPDATE_TODO_ITEM,
    payload,
  };
};

export const resetTodoList = () => {
  return {
    type: RESET_TODO_LIST,
  };
};
