
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (data.paramNames.name == null) {
    errors.identifier = 'This field is required';
  }

  if (data.paramNames.password == null) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
