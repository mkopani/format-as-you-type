import formatString from "./formatString";

const formatDate = (newInput, options = {}, format = 'YYYY-MM-DD') => (
  formatString(newInput, format, options)
);

export default formatDate;
