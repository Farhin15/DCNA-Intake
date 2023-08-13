import React from 'react'
import { FormControl, Grid, Typography, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";


const requestorItems = [
    { id: 'customer', title: 'Customer' },
    { id: 'employee', title: 'Employee' },
    { id: 'applicant', title: 'Applicant' },
    { id: 'franchisee', title: 'Franchisee' },
]

const requestTypeItems = [
    { id: 'dataAcess', title: 'Data Acess' },
    { id: 'dataDeletion', title: 'Data Deletion' },
    { id: 'sale_share', title: 'Opt out of Sale/Share' },
]

const initialFValues = {
    stateId: '',
    isChecked: false,
    firstName: '',
    lastName: '',
    email: '',
    requestor: 'customer',
    request: 'dataAcess',
    requestDetails: '',
    lastSsn: '',
    employeeId: '',
    address: '',
}

export default function EmployeeForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = !fieldValues.email ? "This field is required." : (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('stateId' in fieldValues)
            temp.stateId = fieldValues.stateId.length != 0 ? "" : "This field is required."
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
            employeeService.insertEmployee(values);
            // resetForm()
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Select
                            name="stateId"
                            label="Select State Of Residence"
                            value={values.stateId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            error={errors.stateId}
                        />

                        <Controls.Checkbox
                            name="isChecked"
                            label="I certify that i am currently a residents of this state"
                            value={values.isChecked}
                            onChange={handleInputChange}
                        />
                        <FormControl>
                            <Typography mt={2}>A separate request must be submitted for each privacy right request, such as delete or access,</Typography>
                        </FormControl>
                        <Controls.Input
                            name="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                        />
                        <Controls.Input
                            name="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />

                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.RadioGroup
                            name="requestor"
                            label="Select Requestor Type"
                            value={values.requestor}
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    lastSsn: '',
                                    employeeId: '',
                                    address: '',
                                });
                                handleInputChange(e)
                            }}
                            items={requestorItems}
                        />
                        <Controls.RadioGroup
                            name="request"
                            label="Select Request Type"
                            value={values.request}
                            onChange={handleInputChange}
                            items={requestTypeItems}
                        />

                        <Controls.Textarea
                            name="requestDetails"
                            label="Request Details (Optional)"
                            value={values.requestDetails}
                            onChange={handleInputChange}
                            error={errors.requestDetails}
                        />
                        {values.requestor === 'applicant' ? <Controls.Textarea
                            name="address"
                            label="Address (Optional)"
                            value={values.address}
                            onChange={handleInputChange}
                            error={errors.address}
                        /> : <></>}
                        {values.requestor === 'employee' ? <><Controls.Input
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
                    </Grid>
                </Grid>
            </Form>
        </>
    )
}
