import {
  SET_TODOS,
  UPDATE_TODO,
  DELETE_TODO,
  CREATE_TODO
} from '../constants/constants';

// TODOS REDUCER

export default (state = [], action) => {
  if (action.type === SET_TODOS) {
    return action.todos;
  }
  if (action.type === UPDATE_TODO) {
    return state.map((todo) =>
      todo.id === action.todo.id ? action.todo : todo
    );
  }
  if (action.type === DELETE_TODO) {
    return state.filter((todo) => todo.id !== action.todo.id * 1);
  }
  if (action.type === CREATE_TODO) {
    return [...state, action.todo];
  }
  return state;
};
