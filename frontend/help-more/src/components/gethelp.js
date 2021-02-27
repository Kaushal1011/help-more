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
import Map from "./atoms/maps";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "./navbar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Grow More
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

export default function Addthing() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [text, setText] = useState("");
    const [list, setRadarlist] = useState([]);
    const [lat, setClickedLat] = useState(22);
    const [long, setClickedLong] = useState(70);

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
                            <Tab label="Get Help" />
                        </Tabs>
                    </Paper>

                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={4}>
                                <Paper className={fixedHeightPaper}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="label"
                                                name="label"
                                                label="label"
                                                fullWidth
                                                autoComplete="label"
                                                onChange={(e) => {}}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="details"
                                                name="details"
                                                label="details"
                                                fullWidth
                                                autoComplete="details"
                                                onChange={(e) => {}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <h2>{`Latitude: ${lat}`}</h2>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <h2>{`Longitude: ${long}`}</h2>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {}}
                                            >
                                                Get help
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={8}>
                                <Paper className={fixedHeightPaper}>
                                    {/* <Deposits /> */}
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                required
                                                id="Search Location"
                                                label="Enter location of search"
                                                fullWidth
                                                onChange={(e) => {
                                                    setText(e.target.value);
                                                    console.log(e);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    console.log(
                                                        `https://api.radar.io/v1/search/autocomplete?query=${text}&near=${lat},${long}`
                                                    );
                                                    const apiUrl = `https://api.radar.io/v1/search/autocomplete?query=${text}&near=${lat},${long}`;
                                                    const requestOptions = {
                                                        method: "GET",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                            Authorization:
                                                                "prj_live_pk_16d3116d3a957d12ac0dfcc9ef6fac44792db811",
                                                        },
                                                    };
                                                    fetch(
                                                        apiUrl,
                                                        requestOptions
                                                    )
                                                        .then((response) =>
                                                            response.json()
                                                        )
                                                        .then((data) => {
                                                            console.log(data);
                                                            setRadarlist(
                                                                data.addresses
                                                            );
                                                        });
                                                }}
                                            >
                                                Search
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <List
                                                    component="nav"
                                                    aria-label="secondary mailbox folders"
                                                >
                                                    {list.map((listItem) => (
                                                        <ListItem button>
                                                            <ListItemText
                                                                primary={
                                                                    listItem.placeLabel ||
                                                                    listItem.addressLabel
                                                                }
                                                                secondary={
                                                                    listItem.formattedAddress
                                                                }
                                                                onClick={() => {
                                                                    setRadarlist(
                                                                        []
                                                                    );
                                                                    setClickedLat(
                                                                        listItem.latitude
                                                                    );

                                                                    setClickedLong(
                                                                        listItem.longitude
                                                                    );
                                                                }}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Map
                                                height={"50%"}
                                                width={"56%"}
                                                list={[
                                                    {
                                                        location: {
                                                            coordinates: [
                                                                long,
                                                                lat,
                                                            ],
                                                        },
                                                    },
                                                ]}
                                                lat={lat}
                                                long={long}
                                            />
                                        </Grid>
                                    </Grid>
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
