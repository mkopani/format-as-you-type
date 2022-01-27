import formatString from "./formatString";

const formatPostalCodeCanada = (newInput, options = {}) => (
  formatString(newInput, 'A0A 0A0', { ...options, allCaps: true })
);

export default formatPostalCodeCanada;
