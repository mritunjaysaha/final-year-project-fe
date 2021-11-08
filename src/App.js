import { lazy, Suspense } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { store } from "./app/store";
import { setAuth } from "./reducers/actions";

import { setAuthToken } from "./utils/setAuthToken";

import { Navbar } from "./Components/Navbar";
import { Exam } from "./Components/Exam";
import { MyProfile } from "./Components/MyProfile";
import { navLinks, checkStorage } from "./utils";

const AttemptPage = lazy(() => import("./Components/Pages/AttemptPage"));
const LandingPage = lazy(() => import("./Components/Pages/LandingPage"));
const Course = lazy(() => import("./Components/Course"));

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

checkStorage();

if (window.localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setAuth(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
    }
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route
                            exact
                            path={navLinks.home}
                            component={LandingPage}
                        />
                        {/* TODO: Exam Route [Protected route] */}
                        <Route
                            exact
                            path={navLinks.course}
                            component={Course}
                        />
                        <Route exact path={navLinks.exam} component={Exam} />
                        <Route
                            exact
                            path={navLinks.myProfile}
                            component={MyProfile}
                        />
                        <Route
                            exact
                            path={`/attempt/:examId`}
                            component={AttemptPage}
                        />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
