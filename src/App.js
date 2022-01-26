import { useState } from 'react';
import './App.css';
import useFieldFormatter from './dist/useFieldFormatter';
import formatString from './dist/formatString';
import formatBigNumber from './dist/formatBigNumber';
import formatDate from './dist/formatDate';

// TODO: Make dropdown menu of generic formatters with "other" option
function App() {
  const [format, setFormat] = useState('YYYY-MM-DD');
  const [input, setInput] = useState('');
  
  // const inputFieldFormatter = useFieldFormatter(
  //   (value, options = {}) => formatString(value, format, options),
  //   setInput
  // );
  const inputFieldFormatter = useFieldFormatter(formatDate, setInput);

  return (
    <div className="App" style={{ paddingTop: '2rem' }}>
      {/* <FormRow>
        <label htmlFor="format">Format:&nbsp;</label>
        <input
          id="format"
          type="text"
          value={format}
          onChange={event => {
            const format = event.target.value;

            setFormat(format);
            setInput( formatString(input, format) );
          }}
        />
      </FormRow> */}
      <FormRow>
        <label htmlFor="input">Input:&nbsp;</label>
        <input
          id="input"
          type="text"
          value={input}
          { ...inputFieldFormatter }
        />
      </FormRow>
      <button
        id="clear-button"
        onClick={() => setInput('')}
        disabled={input === ''}
        style={{ marginTop: '1rem' }}
      >
        Clear
      </button>
    </div>
  );
};

export default App;

const FormRow = (props) => (
  <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
    {props.children}
  </div>
);
