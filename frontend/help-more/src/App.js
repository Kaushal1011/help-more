import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
} from "react-router-dom";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";

import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import LandingDash from "./components/landingdash";
import Gethelp from "./components/gethelp";
import Helpothers from "./components/helpothers";
import Rewardme from "./components/rewardme";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[700],
        },
        secondary: {
            main: green[600],
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LandingDash} />
                        <Route exact path="/signup" component={SignupPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/gethelp" component={Gethelp} />
                        <Route exact path="/dohelp" component={Helpothers} />
                        <Route exact path="/rewardme" component={Helpothers} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
