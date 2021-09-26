import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { store } from "./app/store";
import { setAuth } from "./reducers/Auth/authSlice";

import { LandingPage } from "./Components/LandingPage";
import { Navbar } from "./Components/Navbar";
import { Exam } from "./Components/Exam";

import { navLinks } from "./utils/navlinks";

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

if (window.localStorage.jwtToken) {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);

    console.log({ token, decoded });

    store.dispatch(setAuth(decoded));

    const currentTime = Date.mow() / 1000;

    if (decoded.exp < currentTime) {
    }
}

function App() {
    return (
        <>
            <BrowserRouter>
                <LandingPage />
                <Navbar />

                <Switch>
                    {/* TODO: Exam Route [Protected route] */}
                    <Route exact path={navLinks.exam} component={Exam} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
