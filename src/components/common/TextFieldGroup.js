import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup,FormText, Label, Input, FormFeedback } from 'reactstrap';
import {Link} from "react-router-dom";

const TextFieldGroup = ({field, value, isDisabled, label, error, type, onChange, onBlur, text, textLink}) => {

  let formtext = null;
  if (textLink && text) {
    formtext = (
      <FormText color="muted">
        <Link to={textLink}>{text}</Link>
      </FormText>
    );
  } else if (text ) {
    formtext = (
      <FormText color="muted">
        {text}
      </FormText>
    );
  }

  return (
    <div>
      <FormGroup color={ error ?  'danger' : '' }>
        <Label for={field}>{label}</Label>
        <Input
          type={type}
          name={field}
          state={ error ?  'danger' : '' }
          value={value}
          placeholder=""
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onBlur} />
        <FormFeedback><small>{error}</small></FormFeedback>
        {formtext}
      </FormGroup>
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  text: PropTypes.string,
  textLink: PropTypes.string,
  isDisabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
