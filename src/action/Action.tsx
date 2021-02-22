import { Reducer } from "react";
import { CalcOp } from "../model";
import { AppState } from "../ui";

export enum ActionType {
  ADD,
  DELETE,
  REFRESH,
  CLEAR,
  SAVE,
  LOAD,
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export const calcModelReducer: Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.ADD:
      _add(state, action);
      return { ...state };
    case ActionType.DELETE:
      _delete(state, action);
      return { ...state };
    case ActionType.REFRESH:
      _refresh(state, action);
      return { ...state };
    case ActionType.CLEAR:
      _clear(state, action);
      return { ...state };
    case ActionType.SAVE:
      _save(state, action);
      return state;
    case ActionType.LOAD:
      _load(state, action);
      return { ...state };
    default:
      return state;
  }
};

// export function calcModelReducer(prevState: CalcModel, action: Action) {
//   switch (action.type) {
//     case ActionType.ADD:
//       return _add(prevState, action);
//     case ActionType.DELETE:
//       return _delete(prevState, action);
//   }
//   action.m.createNewItem(action.payload.value, CalcOp.PLUS);
//   return action.m.items;
// } :  Reducer<any, any>;

function _save(state: AppState, action: Action) {
  state.model.saveToCookie();
  state.currentInput = 0;
  return state;
}

function _load(state: AppState, action: Action) {
  state.model.loadFromCookie();
  state.currentInput = 0;
  return state;
}

function _add(state: AppState, action: Action) {
  state.model.createNewItem(action.payload, CalcOp.PLUS);
  state.currentInput = 0;
  return state;
}

function _delete(state: AppState, action: Action) {
  state.model.deleteItem(action.payload);
  return state;
}

function _refresh(state: AppState, action: Action) {
  state.model.refreshSum();
  return state;
}

function _clear(state: AppState, action: Action) {
  state.model.clear();
  return state;
}
