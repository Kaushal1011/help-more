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
const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        },
        secondary: {
            main: blue[600],
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
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
