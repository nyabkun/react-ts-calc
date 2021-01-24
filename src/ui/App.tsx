import {
  AppBar,
  Box,
  Container,
  createMuiTheme,
  Grid,
  MuiThemeProvider,
  responsiveFontSizes,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useReducer } from "react";
import { InputUI, ItemListUI, SumUI } from ".";
import { calcModelReducer as appStateReducer } from "../action/Action";
import "../App.css";
import * as M from "../model";
import { SaveLoadUI } from "./SaveLoadUI";

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

// class CAppContext {
//   model = new M.CalcModel();
// }

// export const AppContext = React.createContext(new CAppContext());

// dispatch: React.Dispatch<Action> | null = null;

export interface AppState {
  model: M.CalcModel;
  currentInput: number;
}

const appState: AppState = {
  model: new M.CalcModel(),
  currentInput: 0,
};

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(appStateReducer, appState);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Container maxWidth="md">
          <AppBar position="sticky">
            <Box m="auto">
              <SumUI sum={state.model.sum} />
            </Box>
            <SaveLoadUI dispatch={dispatch} />
          </AppBar>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Box m={5} style={{ width: "80%" }}>
              <Typography variant="button">
                <Grid item>
                  <InputUI
                    dispatch={dispatch}
                    canClear={
                      state.model.items && state.model.items.length !== 0
                    }
                  />
                </Grid>
                <Grid item>
                  <ItemListUI items={state.model.items} dispatch={dispatch} />
                </Grid>
              </Typography>
            </Box>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </>
  );
}
