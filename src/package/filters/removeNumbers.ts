import isNumber from "../_lib/isNumber";
import removeCharacters from "../_lib/removeCharacters";

const removeNumbers = (string: string): string =>
  removeCharacters(string, (x) => !isNumber(x));

export default removeNumbers;
