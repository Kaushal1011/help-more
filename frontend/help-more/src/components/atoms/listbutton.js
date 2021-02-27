import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NatureIcon from "@material-ui/icons/Nature";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ListB(props) {
    const classes = useStyles();

    let list = props.list;
    if (props.button) {
        return (
            <>
                {list.map((elem, i) => {
                    console.log(elem, i);
                    return (
                        <List className={classes.root}>
                            <ListItem
                                button
                                onClick={() => {
                                    props.clickcallback(elem);
                                    console.log("hmm");
                                }}
                            >
                                <ListItemIcon>
                                    <NatureIcon />
                                </ListItemIcon>
                                <ListItemText
                                    id={i}
                                    primary={elem.label}
                                    secondary={elem.details}
                                />
                                <ListItemSecondaryAction>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            props.buttoncallback(elem);
                                            console.log("hmm");
                                        }}
                                    >
                                        {props.button}
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    );
                })}
            </>
        );
    } else {
        return (
            <>
                {list.map((elem, i) => (
                    <List className={classes.root}>
                        <ListItem
                            button
                            onClick={() => {
                                props.clickcallback(elem);
                            }}
                        >
                            <ListItemIcon>
                                <NatureIcon />
                            </ListItemIcon>
                            <ListItemText
                                id={i}
                                primary={elem.label}
                                secondary={elem.details}
                            />
                        </ListItem>
                    </List>
                ))}
            </>
        );
    }
}
