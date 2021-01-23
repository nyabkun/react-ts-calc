import { Delete } from "@material-ui/icons";
import * as U from "../util/Util";
import { Checkbox, Button, TextField, Box } from "@material-ui/core";
import React from "react";
import { ActionType } from "../action/Action";
import { useState } from "react";

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

export const ItemUI: React.FC<any> = ({ item, dispatch }) => {
  // const classes = useStyles();
  // const ctx = useContext(AppContext);
  const [inputNum, setInputNum] = useState(item.value);
  const [inputError, setInputError] = useState(false);
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

  function onInputChange(e: any) {
    // ctx.dispatch!({
    //   type: ActionType.REFRESH,
    //   m: ctx,
    // });
    try {
      let numStr = e.target.value.replaceAll(",", "").replaceAll(".", "");

      let num = U.toNumber(numStr);

      if (!isNaN(num)) {
        item.value = num;
        setInputNum(U.formatNumComma(num));
        setInputError(false);
      } else {
        setInputError(true);
      }
    } catch (error) {
      setInputError(true);
    } finally {
      dispatch!({
        type: ActionType.REFRESH,
      });
    }
  }

  return (
    <div key={item.id}>
      <Box>
        {/* className={classes.box}> */}
        <Checkbox
          // className={classes.btn}
          color="primary"
          checked={item.active}
          onChange={onCheckBoxClick}
        ></Checkbox>

        <TextField
          // className={classes.txt}
          onInput={onInputChange}
          // type="number"
          value={U.formatNumComma(inputNum)}
        />

        <Button
          // className={classes.btn}
          // onClick={() => onDeleteClick(item.id)}
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
