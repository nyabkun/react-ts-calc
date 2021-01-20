import React from "react";
// import { connect } from "react-redux";
// import { Todo, fetchTodos, deleteTodo } from "../actions";
// import { StoreState } from "../reducers";
import "./App.css";
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
import { orange, green, blue } from "@material-ui/core/colors";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #333, #999)",
    // border: 0,
    // borderRadious: 15,
    // color: "white",
    // padding: "0 30px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: orange[500],
    },
  },
});

// function ButtonStyled() {
//   const classes = useStyles();
//   return <Button className={classes.root}>Test Styled Button</Button>;
// }

interface Todo {}

export interface AppProps {
  todos: Todo[];
}

export interface AppState {
  fetching: boolean;
}

export class _App extends React.Component<AppProps, AppState> {
  // componentDidMount() {
  //   this.props.fetchTodos();
  // }
  constructor(props: AppProps) {
    super(props);

    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onDeleteClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  render() {
    console.log(this.props.todos);
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Grid
            container
            justify="center"
            direction="column"
            alignContent="center"
          >
            <Box display="flex">
              <TextField variant="outlined" label="数字を入力" />
              <Button
                startIcon={<Add />}
                onClick={this.onButtonClick}
                variant="contained"
                color="primary"
              >
                追加
              </Button>
            </Box>
            {/* {this.state.fetching ? "LOADING" : null} */}
            {this.renderList()}
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id}>
          <Checkbox></Checkbox>
          {/* <ButtonGroup size="small" variant="contained" color="primary"> */}
          <TextField
            type="number"
            InputProps={{
              inputProps: {},
            }}
            label="数字を入力してください"
          />

          <Button
            onClick={() => this.onDeleteClick(todo.id)}
            startIcon={<Delete />}
            size="small"
            variant="contained"
            color="secondary"
          >
            削除
          </Button>
          {/* <TextField
            color="secondary"
            type="number"
            label="Time"
            variant="filled"
            value={todo.title}
          /> */}
          {/* </ButtonGroup> */}
          {/* <button onClick={() => this.onDeleteClick(todo.id)}>削除</button> */}
          {/* <span>{todo.title}</span> */}
        </div>
      );
    });
  }
}

// const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
//   return { todos };
// };

// export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
