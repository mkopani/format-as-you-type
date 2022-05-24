import React from "react";
import { Formatter, FormatStringOptions } from "./formatString";
import findIndexAfterMovement from "./_lib/findIndexAfterMovement";

type InputRef = React.RefObject<HTMLInputElement>;

export type FieldFormatterOutput = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} | { [refProp: string]: InputRef };

const useFieldFormatter = (
  formatter: Formatter,
  onChange: Function,
  refProp: string = "ref"
): FieldFormatterOutput => {
  const [position, setPosition] = React.useState<number | null>(null);
  const inputRef: InputRef = React.useRef(null);

  if (typeof onChange !== "function") {
    throw new TypeError(
      "Argument must be passed for onChange and must be a function that accepts a new value."
    );
  }

  React.useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input?.setSelectionRange(position, position);
    }
  }, [inputRef, position]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const options: FormatStringOptions = {};

    const target = event.target as HTMLInputElement;
    const thisValue = formatter(target.value);

    const diff = thisValue.length - target.value.length;
    let selectionStart = target.selectionStart;
    selectionStart = selectionStart === null ? 0 : selectionStart;
    const selectionEnd = target.selectionEnd;
    // @ts-ignore
    const inputType = event.nativeEvent.inputType;
    const isMidText = selectionEnd !== null && selectionEnd < thisValue.length - 1;

    let backspaceType: "deleteAt" | "backspaceAt" | "" = "";
    if (!!inputType && inputType.includes("deleteContent")) {
      backspaceType += inputType.includes("Backward") ? "backspace" : "delete";
    }

    const backspaceDetected =
      backspaceType !== "" && selectionStart === selectionEnd;

    if (backspaceDetected) {
      const optionKey: "backspaceAt" | "deleteAt" = `${
        backspaceType === "delete" ? "delete" : "backspace"
      }At`;

      options[optionKey] =
        typeof selectionEnd === "number" ? selectionEnd : undefined;
    }

    onChange(formatter(thisValue, options));

    // Set caret position
    if (backspaceDetected) {
      const newCaretPosition = findIndexAfterMovement(
        thisValue,
        selectionStart,
        backspaceType === "delete"
      );

      setPosition(newCaretPosition);
    } else if (inputType === "insertText" && selectionEnd !== null) {
      const endTextPos = selectionEnd + diff;
      const adjustedMidTextPos = findIndexAfterMovement(
        thisValue,
        selectionEnd,
        true
      );

      setPosition(isMidText ? adjustedMidTextPos : endTextPos);
    }
  };

  return { onChange: handleChange, [refProp]: inputRef };
};

export default useFieldFormatter;
