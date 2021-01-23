import React from "react";
import { Action } from "../action/Action";

export class CalcModel {
  items = [] as CalcItem[];
  nTotalItems = 0;
  sum = 0;

  clear() {
    this.items = [];

    this.refreshSum();
  }

  deleteItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);

    this.refreshSum();
  }

  createNewItem(value: string, op: CalcOp) {
    let newItem = {
      id: this.nTotalItems,
      active: true,
      value: Number(value),
      op: op,
    };

    this.items = [...this.items, newItem];

    this.nTotalItems++;

    this.refreshSum();

    // this.items.push(newItem);

    return newItem;
  }

  refreshSum() {
    if (!this.items || this.items.length === 0) {
      this.sum = 0;
      return;
    }

    this.sum = this.items
      .filter((item) => item.active)
      .map((item) => item.value)
      .reduce((a, b) => a + b, 0);
  }
}

export interface CalcItem {
  id: number;
  value: number;
  active: boolean;
  op: CalcOp;
}

export enum CalcOp {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
}
