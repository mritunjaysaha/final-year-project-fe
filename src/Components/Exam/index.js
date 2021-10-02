import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setUserData } from "../../reducers/Auth/authSlice";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";

import { useGetUser } from "../../customHooks/useGetUser";

import styles from "./exam.module.scss";

export function Exam() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);

    useGetUser();

    return (
        <section className={styles.examContainer}>
            <Button
                onClick={() => {
                    setIsCreateExamClicked(!isCreateExamClicked);
                }}
            >
                Create Exam
            </Button>

            {isCreateExamClicked ? <ExamForm /> : ""}
        </section>
    );
}
