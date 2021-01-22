import React from "react";
import { Reducer } from "react";
import { CalcItem, CalcModel, CalcOp } from "../model";

export enum ActionType {
  ADD,
  DELETE,
  REFRESH,
}

export interface Action {
  type: ActionType;
  m: CalcModel;
  payload?: any;
}

export const itemListReducer: Reducer<CalcItem[], Action> = (
  prevState: CalcItem[],
  action: Action
) => {
  switch (action.type) {
    case ActionType.ADD:
      return _add(prevState, action);
    case ActionType.DELETE:
      return _delete(prevState, action);
    case ActionType.REFRESH:
      return _refresh(prevState, action);
    default:
      return action.m.items;
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

function _add(prevState: CalcItem[], action: Action) {
  action.m.createNewItem(action.payload, CalcOp.PLUS);
  return action.m.items;
}

function _delete(prevState: CalcItem[], action: Action) {
  action.m.deleteItem(action.payload);
  return action.m.items;
}

function _refresh(prevState: CalcItem[], action: Action) {
  console.log("refresh");

  action.m.refreshSum();

  return [...action.m.items];
  // return action.m.items;
}
