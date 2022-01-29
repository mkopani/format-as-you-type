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

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={CustomTheme}>
        <Container style={{ width: '100%' }}>
          <Grid container spacing={2} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <FormCard>
              <FormRow>
                <Dropdown
                  id="mui-format"
                  value={formatter}
                  label="Format"
                  onChange={handleFormatChange}
                  choices={formatterDropdownChoices}
                />
              </FormRow>
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

const CustomTheme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"',
      'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
    ].join(','),
  }
});
