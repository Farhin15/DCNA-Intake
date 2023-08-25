import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import dcnaLogo from "../asset/image/DCNA11.png";
import Controls from "./controls/Controls";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        minWidth: 400,
        minHeight: 100,
        margin: 10,
        padding: 25
    },
    media: {
        height: "80px",
        width: "100%",
    }
});

export default function PermissionDenied({ resetForm }) {
    const classes = useStyles();

    const close = () => {
        window.opener = null;
        window.open('', '_self');
        window.close();
    }

    return (
        <Card className={classes.root}>
            {/* <CardMedia
                className={classes.media}
                image={dcnaLogo}
                title="Paella dish"
            /> */}
            {/* <img src={dcnaLogo} alt="Your Logo" /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Permission Denied
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    At this time, data privacy rights are not provided in your state of residence. Please check the Privacy Notice for more information
                </Typography>
            </CardContent>
            <Controls.Button
                type="reset"
                text="Ok"
                onClick={() => resetForm()} />
        </Card>
    );
}
