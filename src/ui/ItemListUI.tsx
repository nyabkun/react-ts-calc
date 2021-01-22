import { Grid } from "@material-ui/core";
import React from "react";
import { ItemUI } from "./";

export function ItemListUI({ items }: any): JSX.Element {
  console.log("ItemList");

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      {items.map((item: any) => (
        <Grid item>
          <ItemUI key={item.id} item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
