import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

const ClearFieldButton = (props) => {
  const { onClick, ...other } = props;

  return (
    <Tooltip title="Clear Text" enterDelay={200}>
      <span>
        <IconButton
          aria-label="clear-text"
          color="primary"
          onClick={onClick}
          { ...other }
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ClearFieldButton;
