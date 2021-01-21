import React, { useContext, useLayoutEffect, useRef } from "react";
import * as M from "../model";
// import { connect } from "react-redux";
// import { Todo, fetchTodos, deleteTodo } from "../actions";
// import { StoreState } from "../reducers";
import "../App.css";
import Button from "@material-ui/core/Button";
import { Add, Delete } from "@material-ui/icons";
import {
  Container,
  Checkbox,
  Box,
  Grid,
  TextField,
  createMuiTheme,
} from "@material-ui/core";
import { orange, blue } from "@material-ui/core/colors";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { JsxFragment } from "typescript";
import { useState, useReducer } from "react";

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

interface CalcItemUIProps {
  item: M.CalcItem;
  // onDeleteClick: onDeleteClick;
}

const appState = new M.CalcModel();
const AppContext = React.createContext<M.CalcModel>(appState);

// class App extends React.Component<AppProps, AppState> {

function InputUI({ dispatch }: any): JSX.Element {
  const [inputNum, setInputNum] = useState("");
  const ctx = useContext(AppContext);

  function onAddClick(event: React.FormEvent<EventTarget>) {
    event.preventDefault();
    setInputNum("");
    dispatch({
      ctx: ctx,
      value: inputNum,
    });
  }

  function onInputChange(event: React.FormEvent<HTMLDivElement>) {
    let value = (event.target as any).value;
    setInputNum(value);
  }

  return (
    <>
      <form onSubmit={onAddClick}>
        <TextField
          value={inputNum}
          variant="outlined"
          onInput={onInputChange}
          label="数字を入力"
        />
        <Button
          type="submit"
          disabled={!inputNum}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          追加
        </Button>
      </form>
    </>
  );
}

function itemReducer(prevState: any, action: any) {
  action.ctx.createNewItem(action.value);
  return action.ctx.items;
}

function ItemListUI({ items }: any): JSX.Element {
  console.log("ItemList");

  return (
    <>
      {items.map((item: any) => (
        <ItemUI key={item.id} item={item} />
      ))}
    </>
  );
}

const ItemUI: React.FC<CalcItemUIProps> = ({ item }) => {
  return (
    <div key={item.id}>
      <Checkbox></Checkbox>
      <TextField
        type="number"
        value={item.value}
        label="数字を入力してください"
      />

      <Button
        // onClick={() => onDeleteClick(item.id)}
        startIcon={<Delete />}
        size="small"
        variant="contained"
        color="secondary"
      >
        削除
      </Button>
    </div>
  );
};

export default function App(): JSX.Element {
  const ctx = useContext(AppContext);
  const [items, dispatch] = useReducer(itemReducer, ctx.items);

  return (
    <>
      <AppContext.Provider value={appState}>
        <Grid
          container
          justify="center"
          direction="column"
          alignContent="center"
        >
          <InputUI dispatch={dispatch} />
          <ItemListUI items={items} />
        </Grid>
      </AppContext.Provider>
    </>
  );
}

// componentDidMount() {
//   this.props.fetchTodos();
// }
// constructor(props: AppProps) {
//   super(props);
//   this.state = {
//     userInput: NaN,
//     items: [],
//   };
// }
// componentDidUpdate(prevProps: AppProps): void {
//   if (!prevProps.todos.length && this.props.todos.length) {
//     this.setState({ fetching: false });
//   }
// }
// onButtonClick = (): void => {
//   this.props.fetchTodos();
//   this.setState({ fetching: true });
// };
// onDeleteClick = (id: number): void => {
//   this.props.deleteTodo(id);
// };
// render() {
//   console.log(this.props.todos);
//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="md">
//         <Grid
//           container
//           justify="center"
//           direction="column"
//           alignContent="center"
//         >
//           <Box display="flex">
//             <TextField variant="outlined" label="数字を入力" />
//             <Button
//               startIcon={<Add />}
//               onClick={this.onButtonClick}
//               variant="contained"
//               color="primary"
//             >
//               追加
//             </Button>
//           </Box>
//           {/* {this.state.fetching ? "LOADING" : null} */}
//           {this.renderList()}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }
// renderList(): JSX.Element[] {
//   return this.props.todos.map((todo: Todo) => {
//     return (
//       <div key={todo.id}>
//         <Checkbox></Checkbox>
//         {/* <ButtonGroup size="small" variant="contained" color="primary"> */}
//         <TextField
//           type="number"
//           InputProps={{
//             inputProps: {},
//           }}
//           label="数字を入力してください"
//         />
//         <Button
//           onClick={() => this.onDeleteClick(todo.id)}
//           startIcon={<Delete />}
//           size="small"
//           variant="contained"
//           color="secondary"
//         >
//           削除
//         </Button>
//         {/* <TextField
//           color="secondary"
//           type="number"
//           label="Time"
//           variant="filled"
//           value={todo.title}
//         /> */}
//         {/* </ButtonGroup> */}
//         {/* <button onClick={() => this.onDeleteClick(todo.id)}>削除</button> */}
//         {/* <span>{todo.title}</span> */}
//       </div>
//     );
//   });
// }
// }

// const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
//   return { todos };
// };

// export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
