import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl';

import Form from './Form';
import Button from './Button';
import Input from './Input';
import P from './P';
import messages from './messages';

export function AddStringForm({ handleAddString }) {
  const [string, setString] = useState('');
  const [formError, setFormError] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!string.trim()) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 5000);
      return;
    }

    handleAddString(uuidv4(), string);
    setString('');
  }

  function handleChange(evt) {
    setString(evt.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        data-testid="input"
        name="string"
        value={string}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button type="submit" data-testid="submit">
        <FormattedMessage {...messages.submit} />
      </Button>
      {formError && (
        <P data-testid="form-error">
          <FormattedMessage {...messages.invalidInput} />
        </P>
      )}
    </Form>
  );
}

AddStringForm.propTypes = {
  handleAddString: PropTypes.func.isRequired,
};

export default AddStringForm;
