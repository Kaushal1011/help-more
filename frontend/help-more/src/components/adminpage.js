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
import axios from "axios";

import Navbar from './navbar';

// import Badge from "@material-ui/core/Badge";

import Web3 from "web3";
import { lpAddressProviderAddress, daiKovanAddress, aDaiKovanAddress } from '../artifacts/address';

// ABI Imports
import ERC20ABI from '../artifacts/ERC20.json';
import LendingPoolAddressProviderABI from '../artifacts/LendingPoolAddressesProvider.json';
import LendingPoolABI from '../artifacts/LendingPool.json';
import ADaiABI from '../artifacts/ADaiABI.json';

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
        height: 100,
    },
    fixedHeight2: {
        height: 230,
        padding: theme.spacing(2),
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
    },
    fixedHeight3: {
        height: 230,
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        justifyContent: "center",
    },
    bal: {
        flexGrow: 1,
        spacing: theme.spacing(3),
    },
    sidediv: {
        flexDirection: "row",
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto hidden",
        width: "100%",
        justifyContent: "center",
    },
    pad: {
        padding: theme.spacing(2),
    },
    ovf: {
        overflow: "auto",
    },
}));

export default function AdminPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);


    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState(0);
    const [fundsTransfer, setFundsTransfer] = useState(0);
    const [fundsRedeem, setFundsRedeem] = useState(0);
    const [lpAddressProviderContract, setLpAddressProviderContract] = useState(null);
    // const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [examplerequests, setExampleRequests] = useState(null);
    const [examplewithdraws, setExampleWithdraws] = useState(null);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    // const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        async function getAddress() {

            // check for ethereum provider
            if (window.ethereum) {

                // create a new web3 instance
                var web3Instance = new Web3(window.ethereum);
                await window.ethereum.enable();   // enable metamask (or other wallet)
                window.web3 = web3Instance;

                setWeb3(web3Instance);

                // fetch accounts
                var account = (await web3Instance.eth.getAccounts())[0];
                console.log("Account: ", account);

                setAccount(account);
                try {
                    let contract = new web3Instance.eth.Contract(
                        LendingPoolAddressProviderABI,
                        lpAddressProviderAddress
                    );
                    setLpAddressProviderContract(contract);
                } catch (error) {
                    console.log("Error in creating the lending pool address provider contract", error);
                }
            }
        }

            let accessToken = window.localStorage.getItem('token');
            if (!accessToken.includes("Bearer ")) {
                accessToken = String("Bearer " + accessToken)
            }
            let options = {
                method: 'GET',
                url: 'http://localhost:5000/get/pending',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': accessToken
                }
            }
            axios(options).then(
                resp => {
                    console.log("pending Rewards request : ", resp.data.response)
                    let options = {
                        method: 'GET',
                        url: 'http://localhost:5000/get/withdraw',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': accessToken
                        }
                    }
                    axios(options).then(
                        response => {
                            console.log("Rewards request : ", response.data.response)
                            setExampleWithdraws(response.data.response);
                            setExampleRequests(resp.data.response);
                        }
                    ).catch(
                        error => {
                            // setLoading(false);
                            // setSnackbarMessage("Failure. Try again later!");
                            // setSnackbarOpen(true);
                            console.log("Error while fetch withdraw request API : ", error);
                        }
                    )
                }
            ).catch(
                error => {
                    // setLoading(false);
                    // setSnackbarMessage("Failure. Try again later!");
                    // setSnackbarOpen(true);
                    console.log("Error while fetch rewards request API : ", error);
                }
            )

        getAddress();
    }, []);

    // Get the latest LendingPoolCore address
    async function getLendingPoolCoreAddress() {
        // console.log("LP Address provider contract : ", lpAddressProviderContract);
        const lpCoreAddress = await lpAddressProviderContract
            .methods.getLendingPoolCore()
            .call()
            .catch((e) => {
                console.log(`Error getting lendingPool address: ${e.message}`);
            });

        console.log('LendingPoolCore address: ', lpCoreAddress);
        return lpCoreAddress;
    }

    // Get the latest LendingPool address
    async function getLendingPoolAddress() {
        const lpAddress = await lpAddressProviderContract
            .methods.getLendingPool()
            .call()
            .catch((e) => {
                console.log(`Error getting lendingPool address: ${e.message}`);
            });
        console.log('LendingPool address: ', lpAddress);
        return lpAddress;
    }

    /**
     * Deposit DAI into Aave to receive the equivalent aDAI
     * Note: User must have DAI already in their wallet!
     */
    function sendWithdrawRequest() {

        setLoading(true);
        let accessToken = window.localStorage.getItem('token');
        if (!accessToken.includes("Bearer ")) {
            accessToken = String("Bearer " + accessToken)
        }
        let options = {
            method: 'PUT',
            url: 'http://localhost:5000/withdraw',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': accessToken
            },
        }
        axios(options).then(
            response => {
                setLoading(false);
                setSnackbarMessage("Your request for " + response.data.amountToGive + " aDai will be processed soon by the organization!");
                setSnackbarOpen(true);
                console.log("Your request has been processed for : ", response.data.amountToGive, " aDai");
            }
        ).catch(
            error => {
                setLoading(false);
                setSnackbarMessage("Failure. Try again later!");
                setSnackbarOpen(true);
                console.log("Error while withdraw amount API : ", error);
            }
        )
    }

    async function approveAPI(email, userAddress, id) {
        console.log("Approve api called");
        console.log("Address : ", userAddress);
        console.log("My id : ", id);
        let accessToken = window.localStorage.getItem('token');
        if (!accessToken.includes("Bearer ")) {
            accessToken = String("Bearer " + accessToken)
        }
        let options = {
            method: 'PUT',
            url: 'http://localhost:5000/give/rewards',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': accessToken
            },
            data : {email : email, id: id}
        }
        const aDaiAmountinWei = web3.utils.toWei(Number(5).toString(), 'ether').toString();
        await axios(options).then(
            async response => {
                try {
                    const aDaiContract = new web3.eth.Contract(ERC20ABI, aDaiKovanAddress);
                    // TODO : Change address
                    let transferResponse = await aDaiContract.methods
                        .transfer(String(userAddress), aDaiAmountinWei)
                        .send({ from: account });

                    if (transferResponse) {
                        console.log("Funds trasfered...");
                        setSnackbarMessage("Success. Funds Transferred to the User!");
                    }
                    else {
                        console.log("Fund Transfer Failed...!");
                        setSnackbarMessage("Failure. Try again later!");
                    }
                    setSnackbarOpen(true);
                    let options = {
                        method: 'GET',
                        url: 'http://localhost:5000/get/pending',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': accessToken
                        }
                    }
                    axios(options).then(
                        resp => {
                            console.log("Rewards request : ", resp.data.response)
                                setExampleRequests(resp.data.response);
                            }
                        ).catch(
                        error => {
                            console.log("Error while fetch rewards request API : ", error);
                        }
                    )
                } catch (e) {
                    setLoading(false);
                    setSnackbarMessage("Failure in transferring funds. Try again later!");
                    setSnackbarOpen(true);
                    console.log("Error depositing to the LendingPool contract : ", e.message);
                }
            }
        ).catch(
            error => {
                setLoading(false);
                setSnackbarMessage("Failure. Try again later!");
                setSnackbarOpen(true);
                console.log("Error while reward transfer API : ", error);
            }
        )
        setLoading(false);
    }

    async function withdrawAPI(email, funds, userAddress){
        console.log("Approve api called");
        console.log("FUnds : ", funds);
        let accessToken = window.localStorage.getItem('token');
        if (!accessToken.includes("Bearer ")) {
            accessToken = String("Bearer " + accessToken)
        }
        let options = {
            method: 'PUT',
            url: 'http://localhost:5000/withdraw',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': accessToken
            },
            data : {email : email}
        }
        const aDaiAmountinWei = web3.utils.toWei(Number(funds).toString(), 'ether').toString();
        await axios(options).then(
            async response => {
                try {
                    const aDaiContract = new web3.eth.Contract(ERC20ABI, aDaiKovanAddress);
                    // TODO : Change address
                    let transferResponse = await aDaiContract.methods
                        .transfer(String(userAddress), aDaiAmountinWei)
                        .send({ from: account });

                    if (transferResponse) {
                        console.log("Funds trasfered...");
                        setSnackbarMessage("Success. Funds Transferred to the User!");
                    }
                    else {
                        console.log("Fund Transfer Failed...!");
                        setSnackbarMessage("Failure. Try again later!");
                    }
                    setSnackbarOpen(true);
                    let options = {
                        method: 'GET',
                        url: 'http://localhost:5000/get/withdraw',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            'Authorization': accessToken
                        }
                    }
                    axios(options).then(
                        resp => {
                            console.log("Rewards request : ", resp.data.response)
                            setExampleWithdraws(resp.data.response);
                            }
                        ).catch(
                        error => {
                            console.log("Error while fetch rewards request API : ", error);
                        }
                    )
                } catch (e) {
                    setLoading(false);
                    setSnackbarMessage("Failure in transferring funds. Try again later!");
                    setSnackbarOpen(true);
                    console.log("Error depositing to the LendingPool contract : ", e.message);
                }
            }
        ).catch(
            error => {
                setLoading(false);
                setSnackbarMessage("Failure. Try again later!");
                setSnackbarOpen(true);
                console.log("Error while reward transfer API : ", error);
            }
        )
        setLoading(false);
    }

    async function sendFunds() {

        // e.preventDefault();
        setLoading(true);
        console.log('Funds Transfer Amount: ', fundsTransfer);
        let accessToken = window.localStorage.getItem('token');
        if (!accessToken.includes("Bearer ")) {
            accessToken = String("Bearer " + accessToken)
        }
        console.log("My token : ", accessToken);
        const aDaiAmountinWei = web3.utils.toWei(Number(fundsTransfer).toString(), 'ether').toString();
        let options = {
            method: 'PUT',
            url: 'http://localhost:5000/amount/add',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': accessToken
            },
            data: { amount: Number(fundsTransfer) }
        }
        console.log("Options : ", options);
        await axios(options).then(
            async response => {
                try {
                    const aDaiContract = new web3.eth.Contract(ERC20ABI, aDaiKovanAddress);
                    let transferResponse = await aDaiContract.methods
                        .transfer("0xD96b395211E047acb6c41aeDE4555B64DD9FFd50", aDaiAmountinWei)
                        .send({ from: account });

                    if (transferResponse) {
                        console.log("Funds trasfered...");
                        setSnackbarMessage("Success. Funds Transferred to Organization!");
                    }
                    else {
                        console.log("Fund Transfer Failed...!");
                        setSnackbarMessage("Failure. Try again later!");
                    }
                    setSnackbarOpen(true);
                } catch (e) {
                    setLoading(false);
                    setSnackbarMessage("Failure in transferring funds. Try again later!");
                    setSnackbarOpen(true);
                    console.log("Error depositing to the LendingPool contract : ", e.message);
                }
            }
        ).catch(
            error => {
                setLoading(false);
                setSnackbarMessage("Failure. Try again later!");
                setSnackbarOpen(true);
                console.log("Error while add amount API : ", error);
            }
        )
        setLoading(false);
    }

    // convert funds from aave to original token
    async function convertFundsBack() {
        // e.preventDefault();
        setLoading(true);
        try {
            const aDaiContract = new web3.eth.Contract(
                ADaiABI,
                aDaiKovanAddress
            );
            // redeem funds
            const amountToRedeemInWei = web3.utils.toWei(Number(fundsRedeem).toString(), 'ether').toString();
            await aDaiContract.methods.redeem(amountToRedeemInWei).send({ from: account });
        } catch (error) {
            setLoading(false);
            setSnackbarMessage("Error in converting funds. Try again later!");
            setSnackbarOpen(true);
            console.log('Error in fund conversion from adai to dai', error);
        }
        setLoading(false);
        setSnackbarMessage("Success. Check your wallet for funds transferred!");
        setSnackbarOpen(true);

    }

    const handleAmountChange = (e) => {
        // console.log("INPUT: ", e.target.value);
        setAmount(e.target.value);
    }

    const handleFundsChange = (e) => {
        // console.log("INPUT: ", e.target.value);
        setFundsTransfer(e.target.value);
    }

    const handleRedeemFundsChange = (e) => {
        // console.log("INPUT: ", e.target.value);
        setFundsRedeem(e.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };




    if (web3 === null || web3 === undefined) {
        return (
            <div className="App">
                <h2>
                    Please install a wallet such as metamask to proceed.
        </h2>
            </div>
        );

    } else if (account === null || account === undefined) {
        return (
            <div className="App">
                <h2>
                    Please link your metamask account to proceed.
        </h2>
            </div>
        );
    } else {

        return (
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                    <Navbar />
                    <Paper square>
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                            centered
                        >
                            <Tab label="With great power comes great responsibilty" />
                        </Tabs>
                    </Paper>
                    <div className={classes.appBarSpacer} />

                    <Container className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12}>
                                <Paper className={fixedHeightPaper}>
                                    {/* <Chart /> */}
                                    <div className={classes.sidediv}>
                                        <h3>Organisation Wallet Address: {account}</h3>
                                    </div>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12}>
                                <h2>Transfer Requests</h2>
                                <Paper className={fixedHeightPaper2}>
                                    <div className={classes.ovf}>
                                        { examplerequests != null && examplerequests.length > 0 ? 
                                        <>
                                        {examplerequests.map((elem, i) => (
                                            <div
                                                className={classes.sidediv}
                                                key={i}
                                            >
                                                <h3 className={classes.pad}>
                                                    {elem.email}
                                                </h3>
                                                {/* <h1 className={classes.pad}>
                                                    {elem.description}
                                                </h1> */}
                                                <h3 className={classes.pad}>
                                                    5 aDai
                                                </h3>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.pad}
                                                    onClick={() => {approveAPI(elem.email, elem.userAddress, elem._id)}}
                                                >
                                                    Approve
                                                </Button>
                                            </div>
                                        ))}
                                        </>
                                        : <> No transfer requests pending</> }
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <h2>Withdrawal Requests</h2>
                                <Paper className={fixedHeightPaper2}>
                                    {/* </div> */}
                                    <div className={classes.ovf}>
                                        { examplewithdraws != null && examplewithdraws.length > 0 ?
                                        <>
                                        {examplewithdraws.map((elem, i) => (
                                            <div
                                                className={classes.sidediv}
                                                key={i}
                                            >
                                                <h3 className={classes.pad}>
                                                    {elem.email}
                                                </h3>
                                                {/* <h1 className={classes.pad}>
                                                    {elem.totalamount}
                                                </h1> */}
                                                <h3 className={classes.pad}>
                                                    {elem.amount}
                                                </h3>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.pad}
                                                    onClick={() => {withdrawAPI(elem.email, elem.amount, elem.userAddress)}}
                                                >
                                                    Transfer amount
                                                </Button>
                                            </div>
                                        ))}
                                        </>
                                        :
                                        <>No withdrawal requests pending</>}
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/* <Orders /> */}
                            </Paper>
                        </Grid>

                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Container>
                </main>
            </div>
        );
    }
}
