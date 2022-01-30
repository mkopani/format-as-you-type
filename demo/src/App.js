import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer";
import FormCard from "./components/FormCard";
import FormLabel from "@mui/material/FormLabel";
import FormRow from "./components/FormRow";
import Grid from "@mui/material/Grid";
import TextField from "./components/TextField";
import Typography from "@mui/material/Typography";
import { fieldSize } from "./constants";
import useFieldFormatter, {
  formatString,
  formatDate,
  formatPhone,
  formatCreditCard,
  formatPostalCodeCanada,
  formatBigNumber,
} from "format-as-you-type";

const App = () => {
  const [muiFieldValue, setMuiFieldValue] = useState('');
  const [htmlFieldValue, setHtmlFieldValue] = useState('');

  const [formatter, setFormatter] = useState('date');
  const [otherFormat, setOtherFormat] = useState('');

  const [creditCardMode, setCreditCardMode] = useState('NUMBER');

  const creditCardFormatter = (newValue, options) => {
    return formatCreditCard(newValue, options, creditCardMode);
  };

  const customFormatter = (newInput, options, format = otherFormat) => {
    return formatString(newInput, format, options);
  };

  const getFormatterFunction = (formatType = formatter) => {
    let formatterFunction;
    switch (formatType) {
      case 'other':
        formatterFunction = customFormatter;
        break;

      case 'creditCard':
        formatterFunction = creditCardFormatter;
        break;

      default:
        formatterFunction = formatters?.[formatType];
    }

    return formatterFunction;
  };

  const formatMuiField = useFieldFormatter(
    getFormatterFunction(),
    setMuiFieldValue,
    'inputRef'
  );

  const formatHtmlField = useFieldFormatter(
    getFormatterFunction(),
    setHtmlFieldValue
  );

  const handleFormatChange = (event) => {
    const newFormatterType = event.target.value;
    setFormatter(newFormatterType);

    const newFormatter = getFormatterFunction(newFormatterType);

    setMuiFieldValue( newFormatter(muiFieldValue) );
    setHtmlFieldValue( newFormatter(htmlFieldValue) );

    // Reset credit card mode
    creditCardMode !== 'NUMBER' && setCreditCardMode('NUMBER');
  };

  const handleOtherFormatChange = (event) => {
    const newFormat = event.target.value;
    setOtherFormat(newFormat);

    setMuiFieldValue( customFormatter(muiFieldValue, undefined, newFormat) );
    setHtmlFieldValue( customFormatter(htmlFieldValue, undefined, newFormat) );
  };

  const handleCreditCardModeChange = (event) => {
    setCreditCardMode(event.target.value);
    setMuiFieldValue('');
    setHtmlFieldValue('');
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        {/* Header */}
        <Container
          maxWidth="sm"
          component="main"
          sx={{ padding: (theme) => theme.spacing(8, 0, 1) }}
        >
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Format As You Type.
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
                <FormLabel>
                  1. Pick a format.
                </FormLabel>
              </FormRow>
              <FormRow>
                <Dropdown
                  id="format"
                  value={formatter}
                  label="Format"
                  onChange={handleFormatChange}
                  choices={formatterDropdownChoices}
                />
              </FormRow>
              {/* Credit card mode field */}
              {formatter === 'creditCard' && (
                <FormRow>
                  <Dropdown
                    id="credit-card-mode"
                    value={creditCardMode}
                    label="Credit Card Info Type"
                    onChange={handleCreditCardModeChange}
                    choices={creditCardFormatModes}
                  />
                </FormRow>
              )}
              {/* Other format field */}
              {formatter === 'other' && (
                <FormRow>
                  <TextField
                    value={otherFormat}
                    label="Custom Format"
                    onChange={handleOtherFormatChange}
                    onClear={() => setOtherFormat('')}
                  />
                </FormRow>
              )}

              <FormRow>
                <Divider sx={{ mt: 1 }} />
              </FormRow>

              {/* MUI input field */}
              <FormRow>
                <FormLabel>
                  2. Test it out.
                </FormLabel>
                <TextField
                  value={muiFieldValue}
                  label="Custom Input Component"
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
                      sx={{ mt: 1 }}
                      { ...formatHtmlField }
                    />
                  </FormRow>
                </Grid>
              </FormRow>
            </FormCard>
          </Grid>
        </Container>

        {/* Footer */}
        <Footer />
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
  postalCode: formatPostalCodeCanada,
  bigNumber: formatBigNumber,
};

const formatterDropdownChoices = {
  date: 'Date | YYYY-MM-DD',
  phone: 'Phone | (000) 000-0000',
  creditCard: 'Credit Card | 0000 0000 0000 0000',
  postalCode: 'Postal Code | A0A 0A0',
  bigNumber: 'Big Number | 0,000,000',
  other: 'Make Your Own Format',
};

const creditCardFormatModes = {
  NUMBER: 'Credit Card Number',
  EXPIRY_2: 'Expiry (MM / YY)',
  EXPIRY_4: 'Expiry (MM / YYYY)',
};

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
