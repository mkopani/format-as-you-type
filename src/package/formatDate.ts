import formatString, { FormatStringOptions } from "./formatString";

const formatDate = (
  newInput: string,
  options: FormatStringOptions = {},
  format: string = "YYYY-MM-DD"
): string => formatString(newInput, format, { ...options, numbersOnly: true });

export default formatDate;
