import React, { useEffect } from 'react'
import { CircularProgress, FormControl, Grid, Typography, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";
import { useAddNewPostMutation, useGetAllPostQuery } from '../../feature/api/apiSlince'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import img from '../../asset/image/success.png'
import ThankYou from '../../components/Thankyou';
import PermissionDenied from '../../components/PermissionDenied';
let requestor_typeItems = []

const requestTypeItems = [
    { id: 'Data Access', title: 'Data Acess' },
    { id: 'Data Deletion', title: 'Data Deletion' },
    { id: 'Opt out of Sale/Share', title: 'Opt out of Sale/Share' },
]

const initialFValues = {
    state: '',
    isChecked: false,
    first_name: '',
    last_name: '',
    email: '',
    requestor_type: 'Customer',
    request_type: 'Data Access',
    request_details: '',
    lastSsn: '',
    employeeId: '',
    address: '',
}

export default function IntakeRquestForm() {
    const [addNewPost, response] = useAddNewPostMutation()
    const states = useGetAllPostQuery()
    console.log(states);
    const [open, setOpen] = React.useState(false);
    const [success, setsuccess] = React.useState(false);
    const [Error, setError] = React.useState(false);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isFormVisisble, setIsFormVisible] = React.useState(false);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "This field is required."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = !fieldValues.email ? "This field is required." : (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('state' in fieldValues)
            temp.state = fieldValues.state.length != 0 ? "" : "This field is required."
        if ('isChecked' in fieldValues)
            temp.isChecked = fieldValues.isChecked === true ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setIsSubmiting(true)
            // resetForm()
            addNewPost({ url: '/intake-form/', method: 'POST', payload: values })
                .unwrap()
                .then((res) => {
                    setOpen(true);
                    setError('');
                    setsuccess('Request submitted successfully!');
                    setIsSubmit(true);
                    setIsSubmiting(false)
                    resetForm();
                })
                .catch((error) => {
                    setIsSubmiting(false)
                    setOpen(true);
                    setsuccess('');
                    setError(error.data.message)
                })
        }
    }

    return (
        <>
            {isSubmiting ? <div className="loader">
                <div className="loader-center">
                    <CircularProgress
                        size={70} />
                </div>
            </div> : <></>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} sx={{ color: '#ffffff' }} severity={success ? "success" : "error"} variant="filled">
                    {success ? success : Error}
                </Alert>
            </Snackbar>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    {isSubmit ? <Grid container justifyContent='center' style={{ textAlign: "center" }}>
                        <ThankYou />
                    </Grid> : <Grid item xs={10}>
                        <Controls.Select
                            name="state"
                            label="Select State Of Residence"
                            value={values.state}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setIsFormVisible(e.target.value == 'CA' || e.target.value == 'VA' || e.target.value == 'CO' || e.target.value == 'UT')
                                resetForm();
                                setErrors({
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    state: '',
                                    isChecked: ''
                                })
                                setValues(initialFValues);
                                requestor_typeItems = [{ id: 'Customer', title: 'Customer' }];
                                if (e.target.value == 'CA') {
                                    requestor_typeItems = [{ id: 'Customer', title: 'Customer' },
                                    { id: 'Employee', title: 'Employee' },
                                    { id: 'Job Applicant', title: 'Applicant' },
                                    { id: 'Vendor', title: 'Vendor' },]
                                }
                                values.requestor_type = 'Customer';
                                handleInputChange(e)
                            }}
                            options={states?.data ?? []}
                            error={errors.state}
                        />

                        {values.state && isFormVisisble ? <> <Controls.Checkbox
                            name="isChecked"
                            label="I certify that i am currently a residents of this state"
                            value={values.isChecked}
                            onChange={handleInputChange}
                            error={errors.isChecked}
                        />
                            <FormControl>
                                <Typography mt={2}>A separate request must be submitted for each privacy right request, such as delete or access,</Typography>
                            </FormControl>
                            <Controls.RadioGroup
                                name="requestor_type"
                                label="Select Requestor Type"
                                value={values.requestor_type}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        lastSsn: '',
                                        employeeId: '',
                                        address: '',
                                    });
                                    handleInputChange(e)
                                }}
                                items={requestor_typeItems}
                            />
                            <Controls.RadioGroup
                                name="request_type"
                                label="Select Request Type"
                                value={values.request_type}
                                onChange={handleInputChange}
                                items={requestTypeItems}
                            />
                            <Controls.Input
                                name="first_name"
                                label="First Name"
                                value={values.first_name}
                                onChange={handleInputChange}
                                error={errors.first_name}
                            />
                            <Controls.Input
                                name="last_name"
                                label="Last Name"
                                value={values.last_name}
                                onChange={handleInputChange}
                                error={errors.last_name}
                            />
                            <Controls.Input
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                            />

                            <Controls.Textarea
                                name="request_details"
                                label="Request Details (Optional)"
                                value={values.request_details}
                                onChange={handleInputChange}
                                error={errors.request_details}
                            />
                            {values.requestor_type === 'Job Applicant' ? <Controls.Textarea
                                name="address"
                                label="Address (Optional)"
                                value={values.address}
                                onChange={handleInputChange}
                                error={errors.address}
                            /> : <></>}
                            {values.requestor_type === 'Employee' ? <><Controls.Input
                                label="Last 4 of SSN (Optional)"
                                name="lastSsn"
                                value={values.lastSsn}
                                onChange={handleInputChange}
                                error={errors.lastSsn}
                            />
                                <Controls.Input
                                    label="Employee ID (Optional) "
                                    name="employeeId"
                                    value={values.employeeId}
                                    onChange={handleInputChange}
                                    error={errors.employeeId}
                                /></> : <></>}
                        </> : values.state && !isFormVisisble ? <>
                            <Grid container justifyContent='center' style={{ textAlign: "center" }}>
                                <PermissionDenied />
                            </Grid>
                        </> : <></>}

                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </div>
                    </Grid>}
                </Grid>
            </Form>
        </>
    )
}
