import formatString, { FormatStringOptions } from "./formatString";

const formatPostalCodeCanada = (
  newInput: string,
  options: FormatStringOptions = {}
): string => formatString(newInput, "A0A 0A0", { ...options, allCaps: true });

export default formatPostalCodeCanada;
