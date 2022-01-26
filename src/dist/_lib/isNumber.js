const isNumber = (char) => (
  typeof char === 'number' ||
  ( typeof char === 'string' && '0123456789'.includes(char) )
);

export default isNumber;
