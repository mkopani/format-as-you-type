import handleBackspace from "./_lib/handleBackspace";
import isSeparator from "./_lib/isSeparator";
import removeSeparators from "./filters/removeSeparators";
import removeLetters from "./filters/removeLetters";
import removeNumbers from "./filters/removeNumbers";

export type FormatStringOptions = {
  lettersAsSeparators?: boolean;
  numbersOnly?: boolean;
  lettersOnly?: boolean;
  allCaps?: boolean;
  backspaceAt?: number;
  deleteAt?: number;
  customFormatter?: Formatter;
};

export type Formatter = (
  input: string,
  options?: FormatStringOptions
) => string;

const formatString = (
  newInput: string,
  format: string = "",
  {
    lettersAsSeparators = false,
    numbersOnly = false,
    lettersOnly = false,
    allCaps = false,
    backspaceAt,
    deleteAt,
    customFormatter,
  }: FormatStringOptions = {}
) => {
  // Check for conflicting parameters
  checkParameters({ numbersOnly, lettersOnly, lettersAsSeparators });

  // Handle backspace/delete if necessary
  if (typeof backspaceAt === "number") {
    newInput = handleBackspace(newInput, backspaceAt);
  } else if (typeof deleteAt === "number") {
    newInput = handleBackspace(newInput, deleteAt, true);
  }

  if (numbersOnly) newInput = removeLetters(newInput);
  if (lettersOnly) newInput = removeNumbers(newInput);
  if (allCaps) newInput = newInput.toUpperCase();

  // Clean up input and re-start process
  let rawValue = removeSeparators(newInput, lettersAsSeparators);
  if (rawValue.length === 0) return "";

  // Use custom formatter callback if provided
  if (typeof customFormatter === "function") return customFormatter(rawValue);

  // Clean up format and initialize separator map
  const formatCleaned = format.trim();
  const formatLength = formatCleaned.length;
  const separatorMap = buildSeparatorsMap(format, lettersAsSeparators);
  const numSeparators = Object.keys(separatorMap).length;

  // Check for faulty format
  const invalidFormat = checkFormat(formatLength, numSeparators);
  if (invalidFormat) return rawValue;

  // Trim raw string if it exceeds its max length
  const maxInputLength = formatLength - numSeparators;
  if (rawValue.length > maxInputLength) {
    rawValue = rawValue.substring(0, maxInputLength);
  }

  // Convert rawValue into an array
  const inputArray = rawValue.split("");

  for (const [idxString, separator] of Object.entries(separatorMap)) {
    const index = parseInt(idxString);

    // Break loop if index exceeds input length
    if (index > inputArray.length) break;

    // Insert separator at index
    inputArray.splice(index, 0, separator as string);
  }

  return inputArray.join("");
};

export default formatString;

// ********************************************************************
// HELPER FUNCTIONS

/**
 * Check for any conflicting option parameters.
 * 
 * @param {FormatStringOptions} options - The options object for formatString
 */
const checkParameters = ({
  numbersOnly,
  lettersOnly,
  lettersAsSeparators,
}: Pick<
  FormatStringOptions,
  "numbersOnly" | "lettersOnly" | "lettersAsSeparators"
>) => {
  if (numbersOnly && lettersOnly) {
    throw new Error("One of numbersOnly or lettersOnly must be false.");
  }

  if (lettersOnly && lettersAsSeparators) {
    throw new Error("lettersOnly and lettersAsSeparators can't both be true.");
  }
};

/**
 * Check for faulty format.
 * 
 * @param {number} formatLength - The length of the format string
 * @param {number} numSeparators - The number of separators in the format string
 * @returns {boolean}
 */
const checkFormat = (formatLength: number, numSeparators: number): boolean => {
  let hasErrors = false;

  // Print error if format is non-empty
  if (formatLength < 1) {
    console.error("String format must be at least one character long.");
    hasErrors = true;
  }

  // Print error if entire format string is composed of errors
  if (numSeparators === formatLength && numSeparators > 0) {
    console.error("Formatted string cannot consist of only separators.");
    hasErrors = true;
  }

  return hasErrors;
};

type SeparatorsMap = {
  [key: string]: string;
};

/**
 * Determine indices of the format's separator(s).
 * 
 * @param {string} format - The string's format
 * @param {boolean} lettersAsSeparators - Whether letters are to be considered as separators
 * @returns {object}
 */
const buildSeparatorsMap = (
  format: string,
  lettersAsSeparators: boolean = false
): SeparatorsMap => {
  const separatorMap: SeparatorsMap = {};

  for (let i = 0; i < format.length; i++) {
    const char = format[i];
    if (!isSeparator(char, lettersAsSeparators)) continue;

    separatorMap[i] = char;
  }

  return separatorMap;
};
