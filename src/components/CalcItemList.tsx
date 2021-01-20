import { Box, Button, Checkbox, TextField } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React from "react";
import { Todo } from "../actions";

interface CalcItemListProps {
  items: Todo[];
}

interface CalcItemListProps {
  item: Todo;
}

const Todo: React.FC<CalcItemProp> = (item) => {
  return (
    <div key={item.id}>
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
        onClick={() => this.onDeleteClick(item.id)}
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
};

const TodoList: React.FC<CalcItemListProps> = ({ items }) => {
  return (
    <div className="inner">
      {items.length <= 0 ? (
        "登録されたTODOはありません。"
      ) : (
        <ul className="task-list">
          {items.map((item) => (
            <Box display="flex">
              <TextField variant="outlined" label="数字を入力" />
              <Button
                startIcon={<Add />}
                // onClick={this.onButtonClick}
                variant="contained"
                color="primary"
              >
                追加
              </Button>
            </Box>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
