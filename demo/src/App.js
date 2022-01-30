import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Dropdown from "./components/Dropdown";
import FormCard from "./components/FormCard";
import FormRow from "./components/FormRow";
import Grid from "@mui/material/Grid";
import TextField from "./components/TextField";
import Typography from "@mui/material/Typography";
import { authorWebsite, fieldSize } from "./constants";
import useFieldFormatter, {
  formatString,
  formatDate,
  formatPhone,
  formatCreditCard,
  formatPostalCodeCanada,
  formatBigNumber,
} from "format-as-you-type";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const App = () => {
  const [muiFieldValue, setMuiFieldValue] = useState('');
  const [htmlFieldValue, setHtmlFieldValue] = useState('');

  const [formatter, setFormatter] = useState('date');
  const [otherFormat, setOtherFormat] = useState('');

  /* const [creditCardMode, setCreditCardMode] = useState('NUMBER');

  const creditCardFormatter = (newValue, options) => {
    return formatters.creditCard(newValue, options, creditCardMode);
  }; */

  const customFormatter = (newInput, options, format = otherFormat) => {
    return formatString(newInput, format, options);
  };

  const formatMuiField = useFieldFormatter(
    formatter === 'other' ? customFormatter : formatters?.[formatter],
    setMuiFieldValue,
    'inputRef'
  );

  const formatHtmlField = useFieldFormatter(
    formatter === 'other' ? customFormatter : formatters?.[formatter],
    setHtmlFieldValue
  );

  const handleFormatChange = (event) => {
    const newFormatKey = event.target.value;
    setFormatter(newFormatKey);

    const newFormatter = newFormatKey === 'other' ?
      customFormatter :
      formatters?.[newFormatKey];

    setMuiFieldValue( newFormatter(muiFieldValue) );
    setHtmlFieldValue( newFormatter(htmlFieldValue) );
  };

  const handleCustomFormatChange = (event) => {
    const newFormat = event.target.value;
    setOtherFormat(newFormat);

    setMuiFieldValue( customFormatter(muiFieldValue, undefined, newFormat) );
    setHtmlFieldValue( customFormatter(htmlFieldValue, undefined, newFormat) );
  };

  /* const handleCreditCardModeChange = (event) => {
    const newMode = event.target.value;

  }; */

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        {/* Header */}
        <Container
          maxWidth="sm"
          component="main"
          sx={{ padding: (theme) => theme.spacing(8, 0, 2) }}
        >
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Format As You Type.
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
            Pick a generic format or make your own by selecting 'Other'.
          </Typography>
        </Container>
        {/* Main Content */}
        <Container maxWidth="md" component="main">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <FormCard>
              <FormRow>
                <Dropdown
                  id="format"
                  value={formatter}
                  label="Format"
                  onChange={handleFormatChange}
                  choices={formatterDropdownChoices}
                />
              </FormRow>
              {/* {formatter === 'creditCard' && (
                <FormRow>
                  <Dropdown
                    id="credit-card-mode"
                    value={creditCardMode}
                    label="Credit Card Info Type"
                    onChange={handleCreditCardModeChange}
                    choices={creditCardFormatModes}
                  />
                </FormRow>
              )} */}
              {formatter === 'other' && (
                <FormRow>
                  <TextField
                    value={otherFormat}
                    label="Custom Format"
                    onChange={handleCustomFormatChange}
                    onClear={() => setOtherFormat('')}
                  />
                </FormRow>
              )}
              <FormRow>
                <Divider sx={{ mt: 1 }} />
              </FormRow>
              {/* MUI input field */}
              <FormRow>
                <TextField
                  value={muiFieldValue}
                  label="MUI Input"
                  onClear={() => setMuiFieldValue('')}
                  { ...formatMuiField }
                />
              </FormRow>
              {/* HTMLInputElement */}
              <FormRow>
                <Grid container alignItems="center">
                  <HTMLInputLabel
                    htmlFor="html-input-field"
                  >
                    Native HTML Input:&nbsp;
                  </HTMLInputLabel>
                  <FormRow>
                    <StyledHTMLInputField
                      id="html-input-field"
                      value={htmlFieldValue}
                      sx={{ mt: 1, mr: 1 }}
                      { ...formatHtmlField }
                    />
                  </FormRow>
                </Grid>
              </FormRow>
            </FormCard>
          </Grid>
        </Container>

        {/* Footer */}
        <Footer maxWidth="md" component="footer">
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
        </Footer>
      </ThemeProvider>
    </>
  );
};

export default App;

// ********************************************************************
// SUPPLEMENTARY
const formatters = {
  date: formatDate,
  phone: formatPhone,
  creditCard: formatCreditCard,
  postalCode: formatPostalCodeCanada,
  bigNumber: formatBigNumber,
};

const formatterDropdownChoices = {
  date: 'Date | YYYY-MM-DD',
  phone: 'Phone | (000) 000-0000',
  creditCard: 'Credit Card | 0000 0000 0000 0000',
  postalCode: 'Postal Code | A0A 0A0',
  bigNumber: 'Big Number | 0,000,000',
  other: 'Other',
};

/* const creditCardFormatModes = {
  NUMBER: 'Credit Card Number',
  EXPIRY_2: 'Expiry (MM / YY)',
  EXPIRY_4: 'Expiry (MM / YYYY)',
}; */

const CustomTheme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"',
      'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
    ].join(','),
  }
});

const StyledHTMLInputField = styled('input')({
  marginRight: 2,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: fieldSize === 'small' ? '2.2rem' : '2.6rem',
  borderRadius: 5,
  borderStyle: 'solid',
  borderWidth: '1.25px',
  paddingLeft: '0.9rem',
  paddingRight: '0.9rem',
  width: '100%',
});

const HTMLInputLabel = styled('label')({
  color: 'dimgrey',
  fontSize: '0.95rem',
});

const Footer = styled(Container)(({ theme }) => ({
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
