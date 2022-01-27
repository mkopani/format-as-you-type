import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Dropdown = (props) => {
  const { choices, id, label, onChange, value, ...other } = props;

  return (
    <FormControl fullWidth { ...other }>
      <InputLabel id={`label-for-${id}`}>
        {label}
      </InputLabel>
      <Select
        id={id}
        labelId={`label-for-${id}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {Object.entries(choices).map(([choiceValue, choiceLabel]) => (
          <MenuItem key={choiceValue} value={choiceValue}>
            {choiceLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  choices: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Dropdown;
