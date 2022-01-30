import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { authorWebsite } from "../constants";

const FooterContainer = styled(Container)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(8),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const Footer = () => (
  <FooterContainer maxWidth="md" component="footer">
    <Box mt={2}>
      <Typography variant="body2" color="textSecondary" align="center">
        Copyright &copy;{' '}
        <Link color="inherit" href={authorWebsite}>
          Mark Kopani
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  </FooterContainer>
);

export default Footer;
