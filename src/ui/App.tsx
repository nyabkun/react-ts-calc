import { Box, Container, Grid } from "@material-ui/core";
import React, { useContext, useReducer } from "react";
import { InputUI, ItemListUI, SumUI } from ".";
import { itemListReducer } from "../action/Action";
import "../App.css";
import * as M from "../model";

// const useStyles = makeStyles({
//   root: {
//     background: "linear-gradient(45deg, #333, #999)",
//     // border: 0,
//     // borderRadious: 15,
//     // color: "white",
//     // padding: "0 30px",
//   },
// });

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: blue[300],
//     },
//     secondary: {
//       main: orange[500],
//     },
//   },
// });

// function ButtonStyled() {
//   const classes = useStyles();
//   return <Button className={classes.root}>Test Styled Button</Button>;
// }

export default function App(): JSX.Element {
  const ctx = useContext(M.AppContext);
  const [items, dispatch] = useReducer(itemListReducer, ctx.items);
  ctx.dispatch = dispatch;

  return (
    <Container>
      <M.AppContext.Provider value={ctx}>
        <Box m={5}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item>
              <SumUI sum={ctx.sum} />
            </Grid>
            <Grid item>
              <InputUI />
            </Grid>
            <Grid item>
              <ItemListUI items={items} />
            </Grid>
          </Grid>
        </Box>
      </M.AppContext.Provider>
    </Container>
  );
}
