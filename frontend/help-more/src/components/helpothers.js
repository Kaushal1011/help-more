import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListB from "./atoms/listbutton";
import Map from "./atoms/maps";
import { useTimeout } from "./useTimeout";
import Navbar from "./navbar";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Help More
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        maxWidth: "90%",
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 600,
    },
}));

export default function Helpothers() {
    const [value, setValue] = React.useState(0);
    const [list, setList] = React.useState([]);
    const [lat, setLat] = useState(23);
    const [long, setLong] = useState(72);
    const [maplat, setmapLat] = useState(22);
    const [maplong, setmapLong] = useState(72);
    const auth = window.localStorage.getItem("token") ? true : false;
    const token = window.localStorage.getItem("token");
    function callbackclick(elem) {
        console.log("clicked");
        setmapLat(elem.location.coordinates[1]);
        setmapLong(elem.location.coordinates[0]);
    }
    function callbackbutton(elem) {
        console.log("clicked");
        console.log(token);
        setmapLat(elem.location.coordinates[1]);
        setmapLong(elem.location.coordinates[0]);
        if (auth) {
            var axios = require("axios");
            var data = JSON.stringify({
                label: "Someone was helped here ^_^",
                type: "User",
                req: elem,
                x: elem.location.coordinates[0],
                y: elem.location.coordinates[1],
                details: "Generic details",
            });

            var config = {
                method: "post",
                url: "http://localhost:5000/help/do",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    alert("Help did");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("cannot help login first");
        }
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            console.log("Longitude is :", position.coords.longitude);

            const apiUrl = `http://localhost:5000/help/around?x=${position.coords.latitude}&y=${position.coords.longitude}`;
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(long);
                    console.log(lat);
                    setList(data);
                });
        });
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            console.log("Longitude is :", position.coords.longitude);

            let apiUrl;
            if (value == 0)
                apiUrl = `http://localhost:5000/help/around?x=${position.coords.latitude}&y=${position.coords.longitude}`;
            else
                apiUrl = `http://localhost:5000/help/helpedaround?x=${position.coords.latitude}&y=${position.coords.longitude}`;

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(long);
                    console.log(lat);
                    setList(data);
                });
        });
    }, [value]);

    useTimeout(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            console.log("Longitude is :", position.coords.longitude);

            let apiUrl;
            if (value == 0)
                apiUrl = `http://localhost:5000/help/around?x=${position.coords.latitude}&y=${position.coords.longitude}`;
            else
                apiUrl = `http://localhost:5000/help/helpedaround?x=${position.coords.latitude}&y=${position.coords.longitude}`;

            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(long);
                    console.log(lat);
                    setList(data);
                });
        });
    }, 120000);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    // const list = [
    //     { details: "details 1" },
    //     { details: "details 2" },
    //     { details: "details 3" },
    // ];
    let listjsx;
    if (value != 1) {
        listjsx = (
            <ListB
                list={list}
                button="Help Here"
                clickcallback={callbackclick}
                buttoncallback={callbackbutton}
            />
        );
    } else {
        listjsx = <ListB list={list} clickcallback={callbackclick} />;
    }
    return (
        <>
            <Navbar></Navbar>
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                    <Paper square>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                            centered
                        >
                            <Tab label="Help Community Around" />
                            <Tab label="See all the help given Around" />
                        </Tabs>
                    </Paper>

                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={4}>
                                <Paper className={fixedHeightPaper}>
                                    {listjsx}
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={8}>
                                <Paper className={fixedHeightPaper}>
                                    {/* <Deposits /> */}
                                    <Map
                                        height={"60%"}
                                        width={"56%"}
                                        lat={maplat}
                                        long={maplong}
                                        list={list}
                                    />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {/* <Orders /> */}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        </>
    );
}
