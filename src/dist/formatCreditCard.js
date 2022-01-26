import formatString from "./formatString";

const formatCreditCard = (newInput, options = {}, infoType = 'NUMBER') => {
  let format;
  const infoTypeCleaned = infoType.trim().toUpperCase();

  if (infoTypeCleaned === 'EXPIRY_2') {
    format = 'MM / YY';
  } else if (infoTypeCleaned === 'EXPIRY_4') {
    format = 'MM / YYYY';
  } else {
    // If empty string, make format "0000 0000 0000 0000"
    if (newInput.length === 0) {
      format = '0000000000000000';
    } else {
      // AMEX is formatted differently
      format = parseInt(newInput[0]) === 3
        ? '0000 000000 00000'
        : '0000 0000 0000 0000';
    }
  }

  return formatString(newInput, format, options);
};

export default formatCreditCard;
