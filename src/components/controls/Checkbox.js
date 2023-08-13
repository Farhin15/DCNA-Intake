import React from 'react'
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MuiCheckbox } from '@material-ui/core';

export default function Checkbox(props) {

    const { name, label, value, error = null, onChange } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                // {...(error && { error: true, helperText: error })}
                />}
                label={label}
            />
            <FormHelperText error={error !== null}>
                {error ?? ''}
            </FormHelperText>
        </FormControl>
    )
}
