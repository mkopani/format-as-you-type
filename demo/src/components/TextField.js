import React from "react";
import PropTypes from "prop-types";
import { default as MuiTextField } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const TextField = (props) => {
  const { value, label, onChange, onClear, ...other } = props;

  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      InputProps={{
        endAdornment: typeof onClear === 'function' && !!value.length ? (
          <InputAdornment>
            <Tooltip title="Clear Text" enterDelay={200}>
              <span>
                <IconButton aria-label="clear" onClick={onClear}>
                  &times;
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        ) : <React.Fragment />
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
