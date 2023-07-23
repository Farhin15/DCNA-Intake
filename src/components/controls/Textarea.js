import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';


const Textarea = (props) => {

    const useStyles = makeStyles(theme => ({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1)
            }
        },
        textarea: {
            resize: "both"
        }
    }));
    const classes = useStyles();

    const { name, label, value, error = null, onChange, options } = props;
    return (
        // <FormControl className={classes.root} variant="outlined"
        //     {...(error && { error: true })}>
        <TextField
            id="outlined-textarea"
            label={label}
            name={name}
            multiline
            value={value}
            variant="outlined"
            onChange={onChange}
            inputProps={{ className: classes.textarea }}
            {...(error && { error: true, helperText: error })}
        />
        // </FormControl>
    )
}

export default Textarea