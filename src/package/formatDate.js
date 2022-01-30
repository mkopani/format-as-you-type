import formatString from "./formatString";

const formatDate = (newInput, options = {}, format = 'YYYY-MM-DD') => (
  formatString(newInput, format, { ...options, numbersOnly: true})
);

export default formatDate;
