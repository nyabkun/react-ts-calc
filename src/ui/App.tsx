import {
  Box,
  Container,
  Grid,
  AppBar,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
  MuiThemeProvider,
} from "@material-ui/core";
import React, { useContext, useReducer } from "react";
import { InputUI, ItemListUI, SumUI } from ".";
import { itemListReducer } from "../action/Action";
import "../App.css";
import * as M from "../model";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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

  // const classes = useStyles();

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <AppBar position="sticky">
            {/* <Box m="auto">
            <Typography variant="h3">
              ちょ～低機能計算機（足し算のみ）
            </Typography>
          </Box> */}
            {/* <Grid container direction="column">
            <Grid item> */}
            <Box m="auto">
              <SumUI sum={ctx.sum} />
            </Box>
            {/* </Grid>
          </Grid> */}
          </AppBar>
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
                  <Typography variant="button">
                    <InputUI />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="button">
                    <ItemListUI items={items} />
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </M.AppContext.Provider>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
