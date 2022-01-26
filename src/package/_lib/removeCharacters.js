const removeCharacters = (string, filterCallback) => {
  if (typeof filterCallback !== 'function') {
    throw new TypeError('filterCallback must be a function.');
  }

  const asArray = Array.from(string);
  return asArray.filter(x => filterCallback(x)).join('');
};

export default removeCharacters;
