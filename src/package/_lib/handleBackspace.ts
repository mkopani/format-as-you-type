import findIndexAfterMovement from "./findIndexAfterMovement";

const handleBackspace = (
  input: string,
  atIndex: number,
  forward: boolean = false
): string => {
  const splitIndex = findIndexAfterMovement(input, atIndex, forward);
  return input.slice(0, splitIndex) + input.slice(atIndex);
};

export default handleBackspace;
