import formatString from "./formatString";

const formatBigNumber = (
  newInput: string,
  options: { [key: string]: any } = {},
  locale?: string
): string => {
  const {
    prefix = "",
    suffix = "",
    numDecimals = 0,
    ...otherOptions
  } = options;

  const formattedInput = formatString(newInput, undefined, {
    ...otherOptions,
    customFormatter: (i) => parseFloat(i).toLocaleString(locale),
    numbersOnly: true,
  });

  return prefix + formattedInput + suffix;
};

export default formatBigNumber;
