import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const ClearFieldButton = (props) => {
  const { onClick, ...other } = props;

  return (
    <Tooltip title="Clear Text" enterDelay={200}>
      <span>
        <IconButton
          aria-label="clear"
          color="primary"
          onClick={onClick} { ...other }
          sx={{ pl: 1.25, pr: 1.25, ml: 1 }}
        >
          &nbsp;&times;&nbsp;
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ClearFieldButton;
