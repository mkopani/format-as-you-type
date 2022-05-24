import isLetter from "../_lib/isLetter";
import isNumber from "../_lib/isNumber";
import removeCharacters from "../_lib/removeCharacters";

/**
 * Remove all non-numeric characters from a string.
 * @param {string} string - The string in question
 * @returns {string}
 */
const removeSeparators = (
  string: string,
  lettersAsSeparators = false
): string =>
  removeCharacters(
    string,
    (x) => isNumber(x) || (!lettersAsSeparators && isLetter(x))
  );

export default removeSeparators;
 