import Cookie from "universal-cookie";

export class CalcModel {
  private static serialVersionID = "v1.0";
  items = [] as CalcItem[];
  nTotalItems = 0;
  sum = 0;

  private _cookies: Cookie | undefined = undefined;

  get cookies(): Cookie {
    return this._cookies ? this._cookies : new Cookie();
  }

  get cookieKey() {
    return this.constructor.name + "_" + CalcModel.serialVersionID;
  }

  saveToCookie() {
    let json = JSON.stringify(this);
    this.cookies.set(this.constructor.name, json);
  }

  loadFromCookie() {
    let obj = this.cookies.get(this.constructor.name);

    Object.assign(this, obj);
  }

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
