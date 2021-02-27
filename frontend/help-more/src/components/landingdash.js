import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import img from "../img/g1042.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "flex-direction": "column",
    },
    image: {
        position: "absolute",
        bottom: "0px",
        right: "0px",
        "z-index": "-24",
    },
    font: {
        color: "#3DBB83",
    },
    grid: {
        alignItems: "center",
        margin: "auto",
    },
    halfWidth: {
        "margin-left": "30%",
        "margin-right": "30%",
    },
    buttonWrapper: {
        display: "flex",
        "flex-direction": "column",
        "margin-left": "33%",
        width: "33%",
    },
    button: {
        "margin-top": "50px",
        height: "75px",
    },
}));

function LandingDash({ history, ...props }) {
    const classes = useStyles();
    const loginClick = (e) => {
        history.push("/login");
    };
    const signupClick = (e) => {
        history.push("/signup");
    };
    return (
        <div className={classes.root}>
            <div className={classes.font}>
                <Box height="100%" className={classes.grid}>
                    <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={12} className={classes.grid}>
                            <Typography
                                variant="h1"
                                component="h1"
                                gutterBottom
                            >
                                Welcome to Help More!
                            </Typography>
                            <Typography
                                variant="h2"
                                component="h2"
                                gutterBottom
                                className={classes.halfWidth}
                            >
                                Lets help communities around us!
                            </Typography>
                            <div className={classes.buttonWrapper}>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    name="signup"
                                    color="secondary"
                                    id="signup"
                                    size="large"
                                    onClick={signupClick}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    color="secondary"
                                    id="login"
                                    size="large"
                                    onClick={loginClick}
                                >
                                    Login
                                </Button>
                            </div>
                            {/* <Paper className={classes.paper}>xs=6</Paper> */}
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
export default LandingDash;
