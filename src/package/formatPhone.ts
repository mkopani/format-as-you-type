import formatString, { FormatStringOptions } from "./formatString";

const formatPhone = (
  newInput: string,
  options: FormatStringOptions = {},
  format: string = "(000) 000-0000"
): string => formatString(newInput, format, options);

export default formatPhone;
