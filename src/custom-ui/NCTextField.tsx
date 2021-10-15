import { CTextField } from "./CTextField";

export class NCTextField extends CTextField<number> {
  static defaultProps = {
    errorValue: NaN,
    textToValue: (text: string) => {
      if (!text || !text.trim()) {
        // No helper message, just notify an error
        throw new Error(" ");
      }

      let num = Number(text.replaceAll(".", "").replaceAll(",", ""));

      if (isNaN(num)) {
        throw new Error("Couldn't read the number.");
      }
      return num;
    },
    valueToText: (value: number) => value.toLocaleString("en"),
  };
}

export class NoEmptyCTextField extends CTextField<string> {
  static defaultProps = {
    errorValue: "",
    defaultText: "",
    textToValue: (text: string) => {
      if (!text || !text.trim()) {
        // No helper message, just notify an error
        throw new Error(" ");
      }
      return text;
    },
    valueToText: (value: string) => value,
  };
}
