import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const FormCard = (props) => (
  <Grid item xs={12} sm={6}>
    <Card className={props.className} sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        {props.children}
      </Grid>
    </Card>
  </Grid>
);

export default FormCard;
