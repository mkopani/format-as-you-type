import React from "react";
import PropTypes from "prop-types";
import { default as MuiTextField } from "@mui/material/TextField";
import ClearFieldButton from "./ClearFieldButton";
import InputAdornment from "@mui/material/InputAdornment";
import { fieldMargin, fieldSize } from "../constants";

const TextField = (props) => {
  const { value, label, onChange, onClear, ...other } = props;

  return (
    <MuiTextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin={fieldMargin}
      size={fieldSize}
      InputProps={{
        endAdornment: typeof onClear === 'function' && !!value.length ? (
          <InputAdornment position="end">
            <ClearFieldButton
              onClick={onClear}
              size={fieldSize}
            />
          </InputAdornment>
        ) : (
          <React.Fragment />
        ),
        sx: { fontWeight: 400 }
      }}
      { ...other }
    />
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
};

export default TextField;
