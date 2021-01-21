export class CalcModel {
  items = [] as CalcItem[];
  nTotalItems = 0;
  sum = 0;

  refreshSum() {
    this.sum = this.items.map((item) => item.value).reduce((a, b) => a + b);
  }

  createNewItem(value: string, op: CalcOp) {
    let newItem = {
      id: this.nTotalItems,
      value: Number(value),
      op: op,
    };

    this.items = [...this.items, newItem];

    this.nTotalItems++;

    this.refreshSum();

    // this.items.push(newItem);

    return newItem;
  }
}

export interface CalcItem {
  id: number;
  value: number;
  op: CalcOp;
}

export enum CalcOp {
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
}
