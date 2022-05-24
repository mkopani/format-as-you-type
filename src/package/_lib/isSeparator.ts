import isLetter from "./isLetter";
import isNumber from "./isNumber";

const isSeparator = (
  char: string,
  lettersAsSeparators: boolean = false
): boolean => !((isLetter(char) && !lettersAsSeparators) || isNumber(char));

export default isSeparator;