import { Delete } from "@material-ui/icons";
import { Checkbox, Button, Box } from "@material-ui/core";
import React from "react";
import { ActionType } from "../action/Action";
import { useState } from "react";
import { NCTextField } from "../custom-ui/NCTextField";
import { TextToValueResult } from "../custom-ui/CTextField";
import { isForOfStatement } from "typescript";

export const ItemUI: React.FC<any> = ({ item, dispatch }) => {
  const [inputNum, setInputNum] = useState(item.value);
  const [checked, setChecked] = useState(item.active);

  function onDeleteClick(e: any) {
    dispatch!({
      type: ActionType.DELETE,
      payload: item.id,
    });
  }

  function onCheckBoxClick(e: any) {
    setChecked(e.target.checked);
    item.active = e.target.checked;
    console.log("check clicked");

    dispatch!({
      type: ActionType.REFRESH,
    });
  }

  function onInputNum(result: TextToValueResult<number>) {
    setInputNum(result.value);

    // if(!result.errorMsg) {
    // }
    item.value = result.value;

    dispatch!({
      type: ActionType.REFRESH,
    });
  }

  return (
    <div key={item.id}>
      <Box>
        <Checkbox
          color="primary"
          checked={item.active}
          onChange={onCheckBoxClick}
        ></Checkbox>

        <NCTextField
          onInputValue={onInputNum}
          variant="standard"
          label="数字を変更"
          value={item.value}
        />

        <Button
          startIcon={<Delete />}
          size="small"
          variant="contained"
          color="secondary"
          onClick={onDeleteClick}
        >
          削除
        </Button>
      </Box>
    </div>
  );
};
