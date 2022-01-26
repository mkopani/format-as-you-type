# React Field Formatter

#### The simplest field formatting and masking tool for React.

Format input fields the way you want. Real-time. No hassle.

## Overview

* Install by running `npm i react-field-formatter` or `yarn add react-field-formatter`.
* Import to a React component using `import useFieldFormatter from 'react-field-formatter/useFieldFormatter'`.
* Define a hook instance by passing in a formatter (see below) and a callback function to run `onChange`. E.g.,
```
const birthdayFormatter = useFieldFormatter(formatDate, setBirthday);
```
* The hook instance contains props to pass to your input component. Implement them by simply adding `{ ...birthdayFormatter }` at the end of the component's props.

## Generic Formatters

While you can make your own formatters, there are a few that are ready to use:

* formatDate
* formatPhone
* formatCreditCard
* formatBigNumber
* formatPostalCodeCanada

More generic formatters will be added with upcoming versions. However, if you have an idea for a new one, feel free to suggest it by creating an issue.

See the __API__ header further below to learn more about each function's options and parameters.

## Make Your Own Formatter

Generic formatters not getting the job done? Make your own! Just import `formatString`. Here's an example:

```
import formatString from 'react-field-formatter/formatString';

const formatCustom = (newInput, options, /* any additional parameters */) => {
  // Any extra logic goes here...

  return formatString(newInput, '0000 / 0000 \ 0000', options);
};
```

Custom formats can either contain placeholder characters such as `A` for letters and `0` for numbers (e.g. `(000) 000-0000`), or actual letters and numbers (e.g. `(604) 123-4567`). All that matters is where separators (non-numbers and non-letters) are placed.

\***** The only rule is that __the first parameter must be the string being formatted__ and __the second parameter must accept an options argument__. \*****

## Implementing a Formatter in a Component

Here's an example of how to implement `useFieldFormatter` in your component.

```
import React from 'react';
import useFieldFormatter from 'react-field-formatter/useFieldFormatter';
import formatDate from 'react-field-formatter/formatDate';

const YourFormComponent = (props) => {
  const [birthday, setBirthday] = React.useState('');

  const birthdayFormatter = useFieldFormatter(formatDate, setBirthday);

  return (
    <form>
      /* ... */

      <label htmlFor="birthday">Birthday</label>
      <input
        id="birthday"
        value={birthday}
        { ...birthdayFormatter }
      />

      /* ... */
    </form>
  );
};
```

<!-- If you want to see live code in action, just take a look at the demo. -->

## API

### formatDate

`formatDate(newInput, options, format = 'YYYY-MM-DD')`

### formatPhone

`formatPhone(newInput, options, format = '(000) 000-0000')`

### formatCreditCard

`formatCreditCard(newInput, options, infoType = 'NUMBER')`

##### Special parameters

| Parameter | Description | Options |
| --------- | ----------- | ------- |
| infoType | Whether to parse a credit card's number or its expiry date | NUMBER, EXPIRY_2 (`MM / YY`), EXPIRY_4 (`MM / YYYY`)|

##### Info

* This formatter is intended for credit cards with 16-digit numbers.
* If the first digit of a credit card's number is `3`, it will be formatted like an AMEX card. Otherwise, it'll be formatted in groups of four digits.
* If your form might take credit cards with more than 16 numbers, feel free to make a custom formatter using `formatString` (see further below).

### formatBigNumber

`formatBigNumber(newInput, options, locale)`

##### Special parameters

| Parameter | Description | Options |
| --------- | ----------- | ------- |
| locale | The region that determines how a number is formatted (e.g. 0,000,000 in English vs. 0.000.000 in French) | [en-US, fr-CA, etc...](https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes)† |

† This list will be converted to `type LocaleTypes = ...` once this package is converted to TypeScript very soon.

### formatPostalCodeCanada

`formatBigNumber(newInput, options)`

##### Info

This function simply formats strings to match the `A0A 0A0` format.

### formatString

`formatString(newInput, format, options)`

##### Special parameters

| Parameter | Description | Default Value |
| --------- | ----------- | ------- |
| options | Customization for the formatter. See documentation below. | `{}` |

##### Options

| Option | Description | Type (Default Value) |
| ------- | ----------- | ------------ |
| lettersAsSeparators | Treat letters as a separator. I.e. don't format them. | boolean (`false`) |
| numbersOnly | Doesn't allow letters in input. | boolean (`false`) |
| lettersOnly | Doesn't allow numbers in input. | boolean (`false`) |
| customFormatter | Skip `formatString()` and use a custom formatter, such as JavaScript's built-in `number.toLocaleString()`, which is used in `formatBigNumber()`. | function that returns a string |
