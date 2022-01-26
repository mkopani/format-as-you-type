import formatString from "./formatString";

const formatPhone = (newInput, options = {}, format = '(000) 000-0000') => (
  formatString(newInput, format, options)
);

export default formatPhone;