import { Grid } from "@material-ui/core";
import React from "react";
import { ItemUI } from "./";

export function ItemListUI({ items, dispatch }: any): JSX.Element {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      {items.map((item: any) => (
        <Grid item key={item.id}>
          <ItemUI item={item} dispatch={dispatch} />
        </Grid>
      ))}
    </Grid>
  );
}
