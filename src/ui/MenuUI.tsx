import { Box, Button, IconButton } from "@material-ui/core";
import { GetApp, Menu, Save } from "@material-ui/icons";
import React from "react";
import { ActionType } from "../action/Action";

export function SaveLoadUI({ dispatch }: any) {
  function onSaveClick(e: any) {
    dispatch({
      type: ActionType.SAVE,
    });
  }

  function onLoadClick(e: any) {
    dispatch({
      type: ActionType.LOAD,
    });
  }

  return (
    <IconButton edge="start" color="inherit" aria-label="menu">
      <Menu />
    </IconButton>
    // <Box display="flex" flexWrap="nowrap">
    //   <Box border={1} borderColor="grey.500" flexGrow={1}>
    //     <Button
    //       color="inherit"
    //       fullWidth={true}
    //       onClick={onSaveClick}
    //       startIcon={<Save />}
    //     >
    //       セーブ
    //     </Button>
    //   </Box>
    //   <Box flexGrow={1}>
    //     <Button
    //       color="inherit"
    //       fullWidth={true}
    //       onClick={onLoadClick}
    //       startIcon={<GetApp />}
    //     >
    //       ロード
    //     </Button>
    //   </Box>
    // </Box>
  );
}
