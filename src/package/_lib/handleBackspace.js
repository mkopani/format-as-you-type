import findIndexAfterMovement from "./findIndexAfterMovement";

const handleBackspace = (input, atIndex, forward = false) => {
  const splitIndex = findIndexAfterMovement(input, atIndex, forward);
  return input.slice(0, splitIndex) + input.slice(atIndex);
};

export default handleBackspace;
