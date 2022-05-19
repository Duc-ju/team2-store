import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';

function SelectField(props) {
    const {
        field,
        form,
        label,
        autoComplete,
        autoFocus,
        size = 'medium',
        menuItems
    } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const [valueSelect, setValueSelect] = React.useState(value);
    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
    return (
        <FormControl sx={{ width: '100%', m: '16px 0 8px 0' }}>
            <InputLabel id={name} error={showError}>
                {label}
            </InputLabel>
            <Select
                {...field}
                value={valueSelect}
                fullWidth
                labelId={name}
                id={name}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                label={label}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                error={showError}
                size={size}
            >
                {menuItems.map((menuItem, index) => (
                    <MenuItem value={menuItem.value} key={index}>
                        {menuItem.label}
                    </MenuItem>
                ))}
            </Select>
            {showError && (
                <FormHelperText error={true}>{errors[name]}</FormHelperText>
            )}
        </FormControl>
    );
}

// SelectField.propTypes = {
//     field: PropTypes.object.isRequired,
//     form: PropTypes.object.isRequired,
//
//     type: PropTypes.string,
//     label: PropTypes.string,
//     autoComplete: PropTypes.string,
//     autoFocus: PropTypes.bool,
//     menuItems: PropTypes.array
// };
SelectField.defaultProps = {
    type: 'text',
    label: '',
    autoComplete: '',
    autoFocus: false,
    menuItems: []
};

export default SelectField;
