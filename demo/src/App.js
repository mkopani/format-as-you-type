import React, { useState } from "react";
import * as fmt from "format-as-you-type";
import Container from "@mui/material/Container";
import Dropdown from "./components/Dropdown";
import FormCard from "./components/FormCard";
import FormRow from "./components/FormRow";
import Grid from "@mui/material/Grid";
import TextField from "./components/TextField";

const App = (props) => {
  const [muiFieldValue, setMuiFieldValue] = useState('');
  const [htmlFieldValue, setHtmlFieldValue] = useState('');

  const [muiFormatter, setMuiFormatter] = useState('date');
  const [htmlFormatter, setHtmlFormatter] = useState('date');

  const [muiOtherFormat, setMuiOtherFormat] = useState('');
  const [htmlOtherFormat, setHtmlOtherFormat] = useState('');

  const muiCustomFormatter = (newInput, options) => {
    return fmt.formatString(newInput, muiOtherFormat, options);
  };

  const htmlCustomFormatter = (newInput, options) => {
    return fmt.formatString(newInput, htmlOtherFormat, options);
  };

  const formatMuiField = fmt.useFieldFormatter(
    muiFormatter === 'other' ? muiCustomFormatter : formatters?.[muiFormatter],
    setMuiFieldValue,
    'inputRef'
  );

  const formatHtmlField = fmt.useFieldFormatter(
    htmlFormatter === 'other' ? htmlCustomFormatter : formatters?.[htmlFormatter],
    setHtmlFieldValue
  );

  return (
    <Container>
      <Grid container spacing={2}>
        {/* MUI example */}
        <FormCard>
          <FormRow>
            <Dropdown
              id="mui-format"
              value={muiFormatter}
              label="Format"
              onChange={event => setMuiFormatter(event.target.value)}
              choices={formatterDropdownChoices}
            />
          </FormRow>
          {muiFormatter === 'other' && (
            <FormRow>
              <TextField
                value={muiOtherFormat}
                onChange={event => setMuiOtherFormat(event.target.value)}
                onClear={() => setMuiOtherFormat('')}
              />
            </FormRow>
          )}
          <FormRow>
            <TextField
              value={muiFieldValue}
              label={inputFieldLabel}
              onClear={() => setMuiFieldValue('')}
              { ...formatMuiField }
            />
          </FormRow>
        </FormCard>
        
        {/* HTMLInputElement example */}
        <FormCard>
          <FormRow>
            <Dropdown
              id="html-format"
              value={htmlFormatter}
              label="Format"
              onChange={event => setHtmlFormatter(event.target.value)}
              choices={formatterDropdownChoices}
            />
          </FormRow>
          {htmlFormatter === 'other' && (
            <FormRow>
              <TextField
                value={htmlOtherFormat}
                onChange={event => setHtmlOtherFormat(event.target.value)}
                onClear={() => setHtmlOtherFormat('')}
              />
            </FormRow>
          )}
          <FormRow>
            <TextField
              value={htmlFieldValue}
              label={inputFieldLabel}
              onClear={() => setHtmlFieldValue('')}
              { ...formatHtmlField }
            />
          </FormRow>
        </FormCard>
      </Grid>
    </Container>
  );
};

export default App;

// ********************************************************************
// SUPPLEMENTARY
const formatters = {
  date: fmt.formatDate,
  phone: fmt.formatPhone,
  creditCard: fmt.formatCreditCard,
  postalCode: fmt.formatPostalCodeCanada,
  bigNumber: fmt.formatBigNumber,
};

const formatterDropdownChoices = {
  date: 'Date; YYYY-MM-DD',
  phone: 'Phone; (000) 000-0000',
  creditCard: 'Credit Card; 0000 0000 0000 0000',
  postalCode: 'Postal Code; A0A 0A0',
  bigNumber: 'Big Number; 0,000,000',
  other: 'Other',
};

const inputFieldLabel = 'Your Input';
