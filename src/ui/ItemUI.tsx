import { Box, Button, Checkbox, Grid } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { ActionType } from "../action/Action";
import { TextToValueResult } from "../custom-ui/CTextField";
import { NCTextField } from "../custom-ui/NCTextField";

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

    item.value = result.value;

    dispatch!({
      type: ActionType.REFRESH,
    });
  }

  return (
    <Box display="flex">
      <Checkbox
        color="primary"
        checked={item.active}
        onChange={onCheckBoxClick}
      ></Checkbox>
      <Box flexGrow={1} mx={2}>
        <NCTextField
          fullWidth={true}
          onInputValue={onInputNum}
          variant="standard"
          // label="数字を変更"
          value={item.value}
        />
      </Box>
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
  );
};
