import isNumber from "../_lib/isNumber";
import removeCharacters from "../_lib/removeCharacters";

const removeNumbers = (string) => removeCharacters(string, (x) => !isNumber(x));

export default removeNumbers;
