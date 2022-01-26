import isLetter from "../_lib/isLetter";
import removeCharacters from "../_lib/removeCharacters";

const removeLetters = (string) => removeCharacters(string, (x) => !isLetter(x));

export default removeLetters;
