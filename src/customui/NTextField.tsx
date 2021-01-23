import { TextField, TextFieldProps } from "@material-ui/core";
import * as U from "../util";
import React from "react";

interface INTextFieldState {
  textInput: string;
}

//https://stackoverflow.com/questions/56085306/error-message-an-interface-can-only-extend-an-object-type-or-intersection-of-o
type INTextFieldProps = TextFieldProps & {
  // defaultInput: number;
  onNumInput: (value: number) => void;
};

export class NTextField extends React.Component<
  INTextFieldProps,
  INTextFieldState
> {
  // numValue : number = NaN;
  // strRawInputValue : string = "";
  isNotNumber = false;

  constructor(props: INTextFieldProps) {
    super(props);
    this.state = {
      textInput: "",
      // strRawInputValue: props.numvalue.toString(),
    };
  }

  clear() {
    this.setState({
      textInput: "",
    });
  }

  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  // handleChange() {
  //   // Update component state whenever the data source changes
  //   this.setState({
  //     strRawInputValue: this.props.numvalue.toString(),
  //   });
  // }

  onInputChange = (e: any) => {
    this.setState({
      textInput: e.target.value,
    });

    let num = U.toNumber(e.target.value as string);
    // e.target.querySelector("input").value = U.formatNumComma(num);

    if (this.props.onNumInput) {
      // setState は非同期なので、呼び出したあとすぐにその値にはなってない
      // this.props.onNumInput(U.toNumber(this.state.strRawInputValue));
      this.props.onNumInput(num);
    }
  };

  private formatNumString(value: string): string {
    this.isNotNumber = false;
    try {
      let num = U.toNumber(value);
      if (isNaN(num)) {
        this.isNotNumber = true;
        return value;
      }
      return U.formatNumComma(num);
    } catch (error) {
      this.isNotNumber = true;
      return value;
    }
  }

  private invokeError(value: string) {
    // this.setState({
    //   strRawInputValue: value,
    // });
  }

  render() {
    return (
      <TextField
        {...this.props}
        onInput={this.onInputChange}
        error={this.isNotNumber}
        // helperText="半角数字を入力してください"
        // error={inputError}
        value={this.formatNumString(this.state.textInput)}
        // value={U.formatNumComma(this.props.defaultInput)}
      />
    );
  }
}
