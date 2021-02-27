import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LeafyImg from "../img/path642.png";
import Login from "./login";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  imgDiv: {
    "background-size": "cover",
    "background-image": `url(${LeafyImg})`,
    "flex-grow": "2",
    "height": "100vh"
  },
  loginContainer: {
    width: "33%",
    backgroundColor: ""
  }
}));



export default function LoginPage({history, ...props}) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.imgDiv}></div>
      <div className={styles.loginContainer}>
        <Login></Login>
      </div>
    </div>
  );
}