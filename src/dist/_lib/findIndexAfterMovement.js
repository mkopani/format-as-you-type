import isSeparator from "./isSeparator";

const findIndexAfterMovement = (input, startingIndex, forward = false) => {
  let offset = 0, pos = startingIndex;

  while (true) {
    if ( !isSeparator(input.charAt(pos)) ) break;

    offset += forward ? 1 : -1;
    pos += forward ? 1 : -1;
  }

  return startingIndex + offset;
};

export default findIndexAfterMovement;
