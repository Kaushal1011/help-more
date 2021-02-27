import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { Typography, FormControl, FormHelperText } from "@material-ui/core";
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// TODO: colors are TBD
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: green[700],
//     },
//     secondary: {
//       main: blue[400],
//     },
//   },
// });

function Signup({ history, ...props }) {
    const styles = useStyles();
    // TODO: didn't someone say there should be another field here?
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const [errorState, setErrorState] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    // if a field is empty, sets the error attribute of that field to true
    const checkForEmpty = (e) => {
        const { id, value } = e.target;
        if (value.length === 0) {
            setErrorState((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        } else {
            setErrorState((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    const sendInfoToServer = () => {
        const payload = {
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            confirmPassword: userInfo.confirmPassword,
        };
        axios.post("http://localhost:5000/user/signup", payload).then((res) => {
            if (res.status === 200) {
                setUserInfo((prevState) => ({
                    ...prevState,
                    successMessage:
                        "Registration successful. Redirecting to dashboard",
                }));
                window.location.href = "/login";
            } else {
                setUserInfo((prevState) => ({
                    ...prevState,
                    errorMessage: "write helpful error message here",
                }));
            }
        });
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        // super basic input validation (this is worthless without server validation!)
        if (userInfo.password === userInfo.confirmPassword) {
            if (
                userInfo.username.length === 0 ||
                userInfo.email.length === 0 ||
                userInfo.confirmPassword.length === 0 ||
                userInfo.password.length === 0
            ) {
                alert("one or more fields are empty!");
                // TODO: highlight the empty fields (not a priority)
            } else {
                sendInfoToServer();
            }
        } else {
            alert("passwords don't match!");
        }
    };

    return (
        <Container>
            <div className={styles.paper}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={styles.form} noValidate autoComplete="off">
                    {/* <ThemeProvider theme={theme}> */}
                    <Grid container spacing={2}>
                        <FormControl>
                            {userInfo.errorMessage && (
                                <FormHelperText
                                    id="my-helper-text"
                                    error={true}
                                >
                                    {" "}
                                    {userInfo.errorMessage}{" "}
                                </FormHelperText>
                            )}
                            {userInfo.successMessage && (
                                <FormHelperText id="my-helper-text">
                                    {" "}
                                    {userInfo.successMessage}{" "}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Grid item xs={12}>
                            <TextField
                                type="name"
                                name="name"
                                label="Username"
                                id="username"
                                required
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={checkForEmpty}
                                error={errorState.username}
                                fullWidth
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                name="email"
                                label="Email"
                                id="email"
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={checkForEmpty}
                                error={errorState.email}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                                required
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={checkForEmpty}
                                error={errorState.password}
                                fullWidth
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password"
                                id="confirmPassword"
                                required
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={checkForEmpty}
                                error={errorState.confirmPassword}
                                fullWidth
                            ></TextField>
                        </Grid>
                        <Button
                            type="submit"
                            className={styles.submit}
                            onClick={handleSubmitClick}
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    {/* </ThemeProvider> */}
                </form>
                <Link href="/login" className={styles.submit}>
                    Already have an account? Click here to log in!
                </Link>
            </div>
        </Container>
    );
}

export default Signup;
