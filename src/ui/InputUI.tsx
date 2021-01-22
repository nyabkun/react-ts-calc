import { Button, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { ActionType } from "../action/Action";
import { AppContext } from "../model";

export function InputUI(): JSX.Element {
  const [inputNum, setInputNum] = useState("");
  const ctx = useContext(AppContext);

  function onSubmit(e: any) {
    e.preventDefault();
    setInputNum("");
    ctx.dispatch!({
      type: ActionType.ADD,
      m: ctx,
      payload: inputNum,
    });
  }

  function onInputChange(e: any) {
    ctx.dispatch!({
      type: ActionType.REFRESH,
      m: ctx,
    });
    setInputNum(e.target.value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          value={inputNum}
          variant="outlined"
          onInput={onInputChange}
          label="数字を入力"
        />
        <Button
          type="submit"
          disabled={!inputNum}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          追加
        </Button>
      </form>
    </>
  );
}
