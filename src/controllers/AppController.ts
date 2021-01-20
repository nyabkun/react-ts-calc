import { _App } from "../components/App";

export class AppController {
  constructor(private app: _App) {}

  onButtonClick = (): void => {
    this.app.props.fetchTodos();
    this.app.setState({ fetching: true });
  };

  onDeleteClick = (id: number): void => {
    this.app.props.deleteTodo(id);
  };
}
