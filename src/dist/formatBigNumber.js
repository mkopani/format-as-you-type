import formatString from "./formatString";
import setDefaultOption from "./_lib/setDefaultOption";

const formatBigNumber = (newInput, options = {}, locale = undefined) => {
  setDefaultOption(options, 'prefix', '');
  setDefaultOption(options, 'suffix', '');
  setDefaultOption(options, 'numDecimals', 0);

  const { prefix, suffix, numDecimals, ...otherOptions } = options;

  const formattedInput = formatString(newInput, undefined, {
    ...otherOptions,
    customFormatter: (i) => parseFloat(i).toLocaleString(locale),
    numbersOnly: true,
  });

  return prefix + formattedInput + suffix;
};

export default formatBigNumber;
