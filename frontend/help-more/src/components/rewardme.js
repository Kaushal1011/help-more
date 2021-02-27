import React, { useEffect, useState } from "react";
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
import { Button } from "@material-ui/core";
import Navbar from "./navbar";
import ListB from "./atoms/listbutton";
// import Badge from "@material-ui/core/Badge";

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
    fixedHeight2: {
        height: 500,
    },
    fixedHeight3: {
        height: 77,
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        justifyContent: "center",
    },
    bal: {
        flexGrow: 1,
        spacing: theme.spacing(3),
    },
}));

export default function Rewardme() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
    const [list, setList] = useState([]);
    const [maplat, setmapLat] = useState(22);
    const [maplong, setmapLong] = useState(72);

    // const fixedHeightPaper3 = clsx(classes.paper, classes.fixedHeight3);

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
                            <Tab label="How Much Green Did You Make?" />
                        </Tabs>
                    </Paper>
                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={4}>
                                <Paper className={fixedHeightPaper}>
                                    <ListB
                                        list={list}
                                        button="Request reward"
                                        clickcallback={() => {}}
                                        buttoncallback={() => {}}
                                    />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={8}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className={fixedHeightPaper2}>
                                            {/* <Deposits /> */}
                                            <Map
                                                height={"50%"}
                                                width={"56%"}
                                                lat={maplat}
                                                long={maplong}
                                                list={list}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper
                                            className={classes.fixedHeight3}
                                            padding={3}
                                        >
                                            {/* <Deposits /> */}
                                            {/* <div className={classes.bal}> */}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                padding="5px"
                                            >
                                                Balance:
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                padding="5px"
                                            >
                                                5 Coins per Tree
                                            </Button>
                                            {/* </div> */}
                                        </Paper>
                                    </Grid>
                                </Grid>
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
