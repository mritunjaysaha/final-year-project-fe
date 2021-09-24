import { LandingPage } from "./Components/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
    return (
        <>
            <LandingPage />

            <BrowserRouter>
                <Switch></Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
