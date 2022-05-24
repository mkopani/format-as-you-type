const removeCharacters = (
  string: string,
  filterCallback: (x: string) => boolean
): string => {
  if (typeof filterCallback !== "function") {
    throw new TypeError("filterCallback must be a function.");
  }

  const asArray = Array.from(string);
  return asArray.filter((x) => filterCallback(x)).join("");
};

export default removeCharacters;
