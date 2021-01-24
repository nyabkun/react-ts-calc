import { Button, Grid } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { ActionType } from "../action/Action";
import { TextToValueResult } from "../custom-ui/CTextField";
import { NCTextField } from "../custom-ui/NCTextField";

// const useStyles = makeStyles((theme) => ({
//   box: {
//     // padding: 10,
//     // height: 200,
//     // color: "palette.primary",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   txt: {
//     margin: 5,
//   },
//   btn: {
//     margin: 5,
//   },
// }));

export function InputUI({ dispatch, canClear }: any): JSX.Element {
  const [inputNum, setInputNum] = useState(0);
  const inputEle = useRef<any>(null);

  function onSubmit(e: any) {
    e.preventDefault();

    dispatch!({
      type: ActionType.ADD,
      payload: inputNum,
    });

    inputEle.current.clear();

    e.target.querySelector("input").focus();
  }

  function onClearClick(e: any) {
    dispatch!({
      type: ActionType.CLEAR,
    });
  }

  function onInputNum(result: TextToValueResult<number>) {
    setInputNum(result.value);
  }

  function isInputValid() {
    return !isNaN(inputNum) && inputNum !== 0;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <NCTextField
              ref={inputEle}
              onInputValue={onInputNum}
              variant="outlined"
              label="数字を入力"
              value={NaN}
            ></NCTextField>
          </Grid>
          <Grid item>
            <Grid container spacing={1} justify="flex-end" item={true}>
              <Grid item>
                <Button
                  type="submit"
                  disabled={!isInputValid()}
                  startIcon={<Add />}
                  variant="contained"
                  color="primary"
                >
                  追加
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClearClick}
                  disabled={!canClear}
                  startIcon={<Clear />}
                  variant="contained"
                  color="secondary"
                >
                  オールクリア
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
