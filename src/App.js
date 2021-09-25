import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LandingPage } from "./Components/LandingPage";
import { Navbar } from "./Components/Navbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <LandingPage />
                <Navbar />

                <Switch>{/* TODO: Exam Route [Protected route] */}</Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
