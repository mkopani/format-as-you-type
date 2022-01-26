import formatString from "./formatString";

const formatPostalCodeCanada = (newInput, options = {}) => (
  formatString(newInput, 'A0A 0A0', options)
);

export default formatPostalCodeCanada;
