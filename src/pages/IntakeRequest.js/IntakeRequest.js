import React from 'react'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles } from '@material-ui/core';
import IntakeRquestForm from './IntakeRequestForm';
import dcnaLogo from "../../asset/image/DCNA11.png";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function IntakeRquest() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Intake Form"
                subTitle="All fields must be completed, unless marked (optional)"
                icon={<img style={{ height: '30px' }} src={dcnaLogo} fontSize="large" />}
                img={<img src={dcnaLogo} fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <IntakeRquestForm />
            </Paper>
        </>
    )
}
