import { lazy, Suspense } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { store } from "./app/store";
import { setAuth } from "./reducers/actions";

import { setAuthToken } from "./utils/setAuthToken";

import { Navbar } from "./Components/Navbar";
import { MyProfile } from "./Components/MyProfile";
import { navLinks, checkStorage } from "./utils";
import {
    useGetUser,
    useGetPopulatedCourses,
    useGetPopulatedExams,
    useScheduleRequests,
} from "./customHooks";

const SignUpPage = lazy(() => import("./Components/Pages/SignUpPage"));
const AttemptPage = lazy(() => import("./Components/Pages/AttemptPage"));
const LandingPage = lazy(() => import("./Components/Pages/LandingPage"));
const Course = lazy(() => import("./Components/Pages/CoursePage"));
const Exam = lazy(() => import("./Components/Pages/ExamPage"));

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

checkStorage();

if (window.localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setAuth(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        /**
         * remove token and redirect to login page
         */
    }
}

function App() {
    useGetUser();
    useGetPopulatedCourses();
    useGetPopulatedExams();
    useScheduleRequests();

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route exact path="/signup" element={<SignUpPage />} />
                        <Route
                            exact
                            path={navLinks.home}
                            element={<LandingPage />}
                        />
                        {/* TODO: Exam Route [Protected route] */}
                        <Route
                            exact
                            path={navLinks.course}
                            element={<Course />}
                        />
                        <Route exact path={navLinks.exam} element={<Exam />} />
                        <Route
                            exact
                            path={navLinks.myProfile}
                            element={<MyProfile />}
                        />
                        <Route
                            exact
                            path={`/attempt/:examId`}
                            element={<AttemptPage />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
