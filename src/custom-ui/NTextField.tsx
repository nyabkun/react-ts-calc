import { TextField, TextFieldProps } from "@material-ui/core";
import * as U from "../util";
import React from "react";

interface INTextFieldState {
  textInput: string;
  valid: boolean;
}

//https://stackoverflow.com/questions/56085306/error-message-an-interface-can-only-extend-an-object-type-or-intersection-of-o
type INTextFieldProps = TextFieldProps & {
  onNumInput: (value: number) => void;
};

export class NTextField extends React.Component<
  INTextFieldProps,
  INTextFieldState
> {
  textFieldRef = React.createRef<any>();

  defaultState: INTextFieldState;

  constructor(props: INTextFieldProps) {
    super(props);

    this.defaultState = {
      textInput: "",
      valid: this._isValid(""),
    };

    this.state = this.defaultState;
  }

  clear() {
    this.setState(this.defaultState);
    this.props.onNumInput(0);
  }

  onInputChange = (e: any) => {
    let text = e.target.value;

    this.setState({
      textInput: text,
      valid: this._isValid(text),
    });

    try {
      let num = U.toNumber(text);

      if (this.props.onNumInput) {
        // setState は非同期なので、呼び出したあとすぐにその値にはなってない
        // this.props.onNumInput(U.toNumber(this.state.strRawInputValue));
        this.props.onNumInput(num);
      }
    } catch (error) {
      this.props.onNumInput(NaN);
    }
  };

  num() {
    return this.formatNumString(this.state.textInput);
  }

  text() {
    return this.textFieldRef.current.value;
  }

  isValid(): boolean {
    return this._isValid(this.text());
  }

  private _isValid(text: string): boolean {
    let valid = true;
    try {
      let num = U.toNumber(text);
      if (isNaN(num)) {
        valid = false;
      }
    } catch (error) {
      valid = false;
    }

    return valid;
  }

  private checkValid(text: string) {
    let stateValid = this.state.valid;
    let curValid = !this._isValid(text);

    if (stateValid !== curValid) {
      this.setState({
        ...this.state,
        valid: curValid,
      });
    }
  }

  private formatNumString(value: string): string {
    try {
      let num = U.toNumber(value);
      if (isNaN(num)) {
        return value;
      }
      return U.formatNumComma(num);
    } catch (error) {
      return value;
    }
  }

  render() {
    return (
      <TextField
        {...this.props}
        ref={this.textFieldRef}
        onInput={this.onInputChange}
        error={!this.state.valid}
        // helperText="半角数字を入力してください"
        // error={inputError}
        value={this.num()}
        // value={U.formatNumComma(this.props.defaultInput)}
      />
    );
  }
}
