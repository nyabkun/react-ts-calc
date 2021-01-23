import * as React from "react";

// https://github.com/SArnab/react-number-textfield
// MIT LICENSE
interface IProps {
  /**
   * Initial number value to display in the textfield.
   * @type {number}
   */
  number?: number;

  /**
   * The character used to separate the decimal parts from the whole number.
   * This is usually a comma or a dot.
   * @type {string}
   */
  decimal_character: string;

  /**
   * The character used to separate a group of digits in the number.
   * This is done every 3 (thousand) values.
   * @type {string}
   */
  group_separator: string;

  /**
   * The maximum number of decimal places to allow.
   * @param {number}
   */
  precision: number;

  /**
   * JSX Attribute for CSS classnames
   * @type {any}
   */
  className?: any;

  /**
   * JSX attribute for the input placeholder
   * @type {any}
   */
  placeholder?: any;

  /**
   * Callback function to receive changes in the number value.
   * @param {(value: number|undefined) => void}
   */
  didChangeNumber?: (value: number | undefined) => void;
}

interface IState {
  /**
   * The string to display in the textfield.
   * @type {string}
   */
  string_value: string;
}

interface IParseResult {
  string_value: string;
  number_value: number | undefined;
}

const initialState: IState = {
  string_value: "",
};

export default class NumberTextfield extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    decimal_character: ".",
    group_separator: ",",
    precision: 2,
  };

  public state = initialState;

  /**
   * If a number is provided as a prop, this will create a new formatted string
   * for that number.
   * @param {IProps} nextProps
   * @param {IState} currState
   * @return {Partial<IState>|undefined}
   */
  public static derivedStateFromProps(
    nextProps: IProps,
    currState: IState
  ): Partial<IState> | undefined {
    if (typeof nextProps.number === "number") {
      return parseString(
        nextProps.number.toString(),
        nextProps.decimal_character,
        nextProps.group_separator,
        nextProps.precision
      );
    }
    return undefined;
  }

  constructor(props: IProps) {
    super(props);

    // precision must be a positive integer value.
    if (props.precision < 0 || props.precision % 1 !== 0) {
      throw new Error("Maximum precision must be a positive integer.");
    }

    if (typeof props.number === "number") {
      this.state = parseString(
        props.number.toString(),
        props.decimal_character,
        props.group_separator,
        props.precision
      );
    }
  }

  public render() {
    return (
      <input
        type="text"
        className={this.props.className}
        value={this.state.string_value}
        placeholder={this.props.placeholder}
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
      />
    );
  }

  /**
   * Event listener for the KeyPress event fired from the input control.
   * @param {React.KeyboardEvent<any>}
   * @return boolean
   */
  public handleKeyPress = (e: React.KeyboardEvent<any>) => {
    const charCode = e.charCode;
    let shouldCancel = false;

    if (!charCodeIsDigit(charCode)) {
      const charString = String.fromCharCode(charCode);

      // If it is not a digit or a decimal character, cancel the key.
      if (charString !== this.props.decimal_character) {
        shouldCancel = true;
      } else {
        // If the input field does not allow decimals, or if we already typed one, cancel the key.
        if (
          this.props.precision === 0 ||
          this.state.string_value.indexOf(this.props.decimal_character) > -1
        ) {
          shouldCancel = true;
        }
      }
    }

    if (shouldCancel) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  /**
   * Event listener for the change event fired from the input control.
   * @param {React.ChangeEvent<any>} e
   * @return void
   */
  public handleChange = (e: React.ChangeEvent<any>) => {
    const parseResult = parseString(
      e.target.value,
      this.props.decimal_character,
      this.props.group_separator,
      this.props.precision
    );

    this.setState({
      string_value: parseResult.string_value,
    });

    if (typeof this.props.didChangeNumber === "function") {
      this.props.didChangeNumber(parseResult.number_value);
    }
  };
}

/**
 * Parses a string as a number, and returns the number and formatting string.
 * @param {string} value
 * @param {string} decimalChar
 * @param {string} groupChar
 * @param {number} maxPrecision
 * @return {IParseResult}
 */
function parseString(
  value: string,
  decimalChar: string,
  groupChar: string,
  maxPrecision: number
): IParseResult {
  const sanitzeRegExp = new RegExp(`[^0-9${escapeRegExp(decimalChar)}]+`, "g");
  let stringValue = value.replace(sanitzeRegExp, "").replace(decimalChar, ".");
  let numberValue = stringToNumber(stringValue);

  // If we could not find a number, reset the textfield.
  if (typeof numberValue === "undefined" || isNaN(numberValue)) {
    console.warn(
      "String could not be represented as a number. Resetting textfield value."
    );
    return {
      number_value: undefined,
      string_value: "",
    };
  }

  // If it exceeds the maximum precision, chop off excess digits.
  const isDecimal = stringValue.indexOf(".") > -1;
  const precision = countDecimalPrecision(stringValue);
  if (numberValue % 1 !== 0 && precision > maxPrecision) {
    // Exceeds precision, we cannot allow it.
    console.warn("Additional decimal digit will exceed maximum precision.");

    const roundingConstant = Math.pow(10, maxPrecision);
    numberValue = Math.floor(numberValue * roundingConstant) / roundingConstant;
  }

  // Recreate a string value using the derived number
  stringValue = numberToString(
    numberValue,
    groupChar,
    decimalChar,
    isDecimal ? Math.max(0, Math.min(precision, maxPrecision)) : -1
  );

  return {
    number_value: numberValue,
    string_value: stringValue,
  };
}

/**
 * Returns the numerical representation of a number.
 * @param {string} value
 * @return number|undefined
 */
function stringToNumber(value: string): number | undefined {
  let numberValue: number | undefined = undefined;

  // If we have a decimal dot in the string, then it is a floating point number.
  const isDecimal: boolean = value.indexOf(".") > -1;

  // If it is a floating point number, make sure we have at least one whole number.
  // Assume zero if nothing is there.
  if (isDecimal && value.length === 1) {
    value = "0" + value;
  }

  // If it has the decimal character, we will parse the string as a decimal value.
  if (isDecimal) {
    numberValue = parseFloat(value);
  } else {
    numberValue = parseInt(value);
  }

  return numberValue;
}

/**
 * Returns a string representation of a number given a specific group character and decimal character.
 * Providing -1 for precision will remove the decimal point altogether.
 * Providing 0 for precision will add just the decimal point.
 * Any positive number will add the decimal values and pad with zeroes.
 * @param {number} value
 * @param {string} groupChar
 * @param {string} decimalChar
 * @param {number} precision
 * @return string
 */
function numberToString(
  value: number,
  groupChar: string,
  decimalChar: string,
  precision: number
): string {
  const stringValueParts = value.toString().split(".");
  const integerString = stringValueParts[0];
  const decimalString = stringValueParts.length > 1 ? stringValueParts[1] : "";
  const numGroups = Math.floor(integerString.length / 3);
  let formattedString: string = "";

  // Add the whole integer values, separated by every 3 numbers with the groupChar
  if (numGroups > 0) {
    for (let i = 1; i <= numGroups; i++) {
      formattedString =
        integerString.substr(i * -3, 3) +
        (i > 1 ? groupChar + formattedString : "");
    }
  }

  // Add the remaining integers that didn't fall into a group of 3
  const integerRemainder = integerString.length % 3;
  if (integerRemainder > 0) {
    formattedString =
      integerString.substr(0, integerRemainder) +
      (formattedString.length > 0 ? groupChar + formattedString : "");
  }

  // If we are including decimal values, add the decimal character and the decimal string values.
  // Fill in 0s for any remaining precision.
  if (precision > -1) {
    formattedString += decimalChar + decimalString;
    if (precision > decimalString.length) {
      formattedString += new Array(precision - decimalString.length)
        .fill(0)
        .join("");
    }
  }

  return formattedString;
}

/**
 * Returns the precision (number of decimal places) in a numberical string.
 * @param {number} value
 * @param {string} decimalChar The character used for a decimal.
 * @return {number}
 */
function countDecimalPrecision(value: string): number {
  const stringParts = value.toString().split(".");
  if (stringParts.length > 1) {
    return stringParts[1].length;
  }

  return 0;
}

/**
 * Escapes certain characters in a string and prepares it for use as a regular expression.
 * @see https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
 * @param {string} str
 * @return {string}
 */
function escapeRegExp(str: string): string {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Whether or not a given character code maps to a decimal digit (0-9).
 * @return {boolean}
 */
function charCodeIsDigit(charCode: number): boolean {
  if (charCode >= 48) {
    if (charCode <= 57) {
      return true;
    }
  }
  return false;
}
