import { TextField, TextFieldProps } from "@material-ui/core";
import * as U from "../util";
import React from "react";

interface CTextFieldState {
  // rawText: string;
  text: string;
  errorMsg: string | null;
}

interface CTextFieldOwnProps<T> {
  onInputValue?: (result: TextToValueResult<T>) => void;
  value: T;
  errorValue: T;
  textToValue: (text: string) => T;
  valueToText: (value: T) => string;
}

//https://stackoverflow.com/questions/56085306/error-message-an-interface-can-only-extend-an-object-type-or-intersection-of-o
export type CTextFieldProps<T> = TextFieldProps & CTextFieldOwnProps<T>;

export interface TextToValueResult<T> {
  value: T;
  errorMsg: string;
}

export class CTextField<T> extends React.Component<
  CTextFieldProps<T>,
  CTextFieldState
> {
  // 実装クラス毎に作る
  // https://stackoverflow.com/a/37282264
  // public static defaultProps = {
  //   defaultValue: null,
  //   errorValue: null,
  //   // parser: (txt :string) => txt,
  //   formatter: (value: any) => JSON.stringify(value),
  // }
  // defaultTxt: string;

  textFieldRef = React.createRef<any>();

  defaultState: CTextFieldState;

  defaultResult: TextToValueResult<T>;

  constructor(props: CTextFieldProps<T>) {
    super(props);

    let defaultTxt = props.value ? this.valueToText(props.value) : "";

    this.defaultResult = this.textToValue(defaultTxt);

    this.defaultState = {
      text: defaultTxt,
      errorMsg: this.defaultResult.errorMsg,
    };

    this.state = this.defaultState;
  }

  clear() {
    this.setState(this.defaultState);
    if (this.props.onInputValue) {
      // let defaultParseResult = this.textToValue(this.defaultTxt);
      this.props.onInputValue(this.defaultResult);
    }
  }

  muiTextFieldProps(): TextFieldProps {
    // couldn't find a way to iterate over interface's key
    let ownKeys = [
      "onInputValue",
      "errorValue",
      "defaultText",
      "textToValue",
      "valueToText",
    ];

    let tfProps = Object.assign({}, this.props) as any;

    for (const key of ownKeys) {
      delete tfProps[`${key}`];
    }

    tfProps.ref = this.textFieldRef;
    tfProps.onInput = this.onInputChange;
    tfProps.error = !!this.state.errorMsg; //if truthy
    tfProps.helperText = this.helperText();
    // helperText="半角数字を入力してください"
    // error={inputError}
    tfProps.value = this.state.text;
    // value={U.formatNumComma(this.props.defaultInput)}

    return tfProps as TextFieldProps;
  }

  onInputChange = (e: any) => {
    let text = e.target.value;

    let formatResult = this.formatText(text);

    if (this.state.text !== formatResult.formattedText) {
      let fText;
      if (!!formatResult.textToValueResult.errorMsg) {
        //error
        fText = e.target.value;
      } else {
        //no error
        fText = formatResult.formattedText;
      }

      this.setState({
        text: fText,
        errorMsg: formatResult.textToValueResult.errorMsg,
      });

      if (this.props.onInputValue) {
        this.props.onInputValue(formatResult.textToValueResult);
      }
    }
  };

  private valueToText(value: T) {
    return this.props.valueToText(value);
  }

  private textToValue(text: string): TextToValueResult<T> {
    if (!text) text = "";

    try {
      let value = this.props.textToValue(text);
      return {
        value: value,
        errorMsg: "",
      };
    } catch (error) {
      let msg;
      if ("message" in error) {
        msg = error.message;
      } else {
        msg = JSON.stringify(error);
      }

      return {
        value: this.props.errorValue,
        errorMsg: msg,
      };
    }
  }

  getValue(): T {
    let txt = this.getRawText();
    return this.textToValue(txt).value;
  }

  getRawText(): string {
    return this.textFieldRef.current.value;
  }

  isValid(): boolean {
    return this._isValid(this.getRawText());
  }

  private _isValid(text: string): boolean {
    return !!!this.textToValue(text).errorMsg;
  }

  private _checkValid(text: string): void {
    let stateErr = this.state.errorMsg;
    let curErr = this.textToValue(text).errorMsg;

    if (stateErr !== curErr) {
      this.setState({
        ...this.state,
        errorMsg: curErr,
      });
    }
  }

  private helperText() {
    if (this.state.errorMsg && this.state.errorMsg.trim()) {
      return this.state.errorMsg;
    } else {
      return "";
    }
  }

  private formatText(
    text: string
  ): {
    textToValueResult: TextToValueResult<T>;
    formattedText: string;
  } {
    let result = this.textToValue(text);

    let formattedText;
    if (result.errorMsg) {
      formattedText = text;
    } else {
      formattedText = this.props.valueToText(result.value);
    }

    return {
      textToValueResult: result,
      formattedText: formattedText,
    };
  }

  render() {
    return <TextField {...this.muiTextFieldProps()} />;
  }
}
