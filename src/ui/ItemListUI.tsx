import { Box, Grid, Paper } from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import React from "react";
import { ItemUI } from "./";

export function ItemListUI({ items, dispatch }: any): JSX.Element {
  return (
    <>
      <Box>
        {items.map((item: any) => (
          <Box key={item.id} m={1}>
            <Paper elevation={3} style={{ backgroundColor: yellow[100] }}>
              <Box p={1}>
                <ItemUI item={item} dispatch={dispatch} />
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
}
