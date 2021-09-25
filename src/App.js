import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LandingPage } from "./Components/LandingPage";
import { Navbar } from "./Components/Navbar";
import { Exam } from "./Components/Exam";

import { navLinks } from "./utils/navlinks";

function App() {
    return (
        <>
            <BrowserRouter>
                {/* <LandingPage /> */}
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
