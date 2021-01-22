import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { ActionType } from "../action/Action";
import { AppContext } from "../model";
import * as U from "../util/Util";

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

export function InputUI(): JSX.Element {
  // const classes = useStyles();
  const [inputNum, setInputNum] = useState("");
  const [inputError, setInputError] = useState(false);
  const ctx = useContext(AppContext);

  function onSubmit(e: any) {
    e.preventDefault();

    ctx.dispatch!({
      type: ActionType.ADD,
      m: ctx,
      payload: U.toNumber(inputNum),
    });

    setInputNum("");

    e.target.querySelector("input").focus();
  }

  function onClearClick(e: any) {
    ctx.dispatch!({
      type: ActionType.CLEAR,
      m: ctx,
    });
  }

  function onInputChange(e: any) {
    // ctx.dispatch!({
    //   type: ActionType.REFRESH,
    //   m: ctx,
    // });
    try {
      let numStr = e.target.value.replaceAll(",", "").replaceAll(".", "");

      let num = U.toNumber(numStr);

      if (!isNaN(num)) {
        setInputNum(U.formatNumComma(num));
        setInputError(false);
      } else {
        setInputError(true);
      }
    } catch (error) {
      setInputError(true);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              // className={classes.txt}
              value={inputNum}
              variant="outlined"
              onInput={onInputChange}
              label="数字を入力"
              // helperText="半角数字を入力してください"
              error={inputError}
            />
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
                  disabled={!ctx.items || ctx.items.length === 0}
                  startIcon={<Clear />}
                  variant="contained"
                  color="secondary"
                >
                  クリア
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
