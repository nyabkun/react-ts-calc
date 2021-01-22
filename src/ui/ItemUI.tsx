import { Delete } from "@material-ui/icons";
import { Checkbox, Button, TextField } from "@material-ui/core";
import { AppContext } from "../model";
import { useContext } from "react";
import { ActionType } from "../action/Action";
import { useState } from "react";
import { isConstructorDeclaration } from "typescript";

export const ItemUI: React.FC<any> = ({ item, dispatch }) => {
  const ctx = useContext(AppContext);
  const [checked, setChecked] = useState(item.active);

  function onDeleteClick(e: any) {
    ctx.dispatch!({
      type: ActionType.DELETE,
      m: ctx,
      payload: item.id,
    });
  }

  function onCheckBoxClick(e: any) {
    setChecked(e.target.checked);
    item.active = e.target.checked;
    console.log("check clicked");

    ctx.dispatch!({
      type: ActionType.REFRESH,
      m: ctx,
    });
  }

  return (
    <div key={item.id}>
      <Checkbox checked={item.active} onChange={onCheckBoxClick}></Checkbox>
      <TextField
        type="number"
        value={item.value}
        label="数字を入力してください"
      />

      <Button
        // onClick={() => onDeleteClick(item.id)}
        startIcon={<Delete />}
        size="small"
        variant="contained"
        color="secondary"
        onClick={onDeleteClick}
      >
        削除
      </Button>
    </div>
  );
};
