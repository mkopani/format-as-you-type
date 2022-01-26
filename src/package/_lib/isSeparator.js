import isLetter from "./isLetter";
import isNumber from "./isNumber";

const isSeparator = (char, lettersAsSeparators) => (
  !( (isLetter(char) && !lettersAsSeparators) || isNumber(char) )
);

export default isSeparator;