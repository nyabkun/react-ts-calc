import { Button, Grid } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { ActionType } from "../action/Action";
import { NTextField } from "../customui/NTextField";

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
  // const classes = useStyles();
  // const [inputNum, setInputNum] = useState("");
  // inputNum はレンダリング状態に関係なく保持しておきたい => useState じゃなくて useRef
  const inputNum = useRef(0);
  const inputEle = useRef<any>(null);
  // const ctx = useContext(AppContext);

  function onSubmit(e: any) {
    e.preventDefault();

    dispatch!({
      type: ActionType.ADD,
      payload: inputNum.current,
    });

    inputEle.current.clear();

    // setInputNum("");
    // setInputNum(0);

    e.target.querySelector("input").focus();
  }

  function onClearClick(e: any) {
    dispatch!({
      type: ActionType.CLEAR,
    });
  }

  function onNumInput(value: number) {
    inputNum.current = value;
    // ctx.dispatch!({
    //   type: ActionType.REFRESH,
    //   m: ctx,
    // });
    // try {
    //   // let numStr = e.target.value.replaceAll(",", "").replaceAll(".", "");
    //   // let num = U.toNumber(numStr);
    //   let num = e.target.value;
    //   if (!isNaN(num)) {
    //     setInputNum(e.target.value);
    //     // setInputNum(U.formatNumComma(num));
    //     setInputError(false);
    //   } else {
    //     setInputError(true);
    //   }
    // } catch (error) {
    //   setInputError(true);
    // }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <NTextField
              ref={inputEle}
              // defaultInput={defaultInputValue}
              onNumInput={onNumInput}
              variant="outlined"
              label="数字を入力"
            ></NTextField>
            {/* <TextField
              // className={classes.txt}
              value={inputNum}
              variant="outlined"
              onInput={onInputChange}
              label="数字を入力"
              // helperText="半角数字を入力してください"
              error={inputError}
            /> */}
          </Grid>
          <Grid item>
            <Grid container spacing={1} justify="flex-end" item={true}>
              <Grid item>
                <Button
                  // className={classes.btn}
                  type="submit"
                  disabled={!inputNum}
                  startIcon={<Add />}
                  variant="contained"
                  color="primary"
                >
                  追加
                </Button>
              </Grid>
              <Grid item>
                <Button
                  // className={classes.btn}
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
