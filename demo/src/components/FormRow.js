import Grid from "@mui/material/Grid";

const FormRow = (props) => (
  <Grid item xs={12}>
    {props.children}
  </Grid>
);

export default FormRow;
