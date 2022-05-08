import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';

function CheckBoxField(props) {
  const { field, label, color, form } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div>
      <FormControlLabel
        control={<Checkbox value='remember' color={color} {...field} />}
        label={label}
      />
      <FormHelperText error={showError}>{errors[name]}</FormHelperText>
    </div>
  );
}

CheckBoxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  color: PropTypes.string,
};

CheckBoxField.defaultProps = {
  label: '',
  color: 'primary',
};

export default CheckBoxField;
