import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import axios from "axios";

export function useScheduleRequests() {
    const [requests, setRequests] = useState([]);

    /**
     * Get the pending POST requests
     */
    useEffect(() => {
        get("SCHEDULE_REQUEST")
            .then((data) => {
                console.log("[useScheduleRequests]", data);

                setRequests(data);
            })
            .catch((err) =>
                console.error("[useScheduleRequests]", err.message)
            );
    }, []);

    /**
     * Send the pending POST requests
     */
    useEffect(() => {
        console.log("[useScheduleRequests] send", requests);

        async function postPendingRequests(url, data) {
            console.log("[useScheduleRequests] pp", { url, data });
            await axios
                .post(url, data)
                .then((res) => {
                    console.log("[useScheduleRequests] Successfully sent", res);
                    // console.log("[useScheduleRequests] post", res);

                    setRequests((prev) => {
                        return prev.filter((p) => p.url !== url);
                    });
                })
                .catch((err) =>
                    console.error(
                        "[useScheduleRequests] error --- ",
                        err.message
                    )
                );
        }

        if (!!requests) {
            requests.map(({ url, data }) => {
                postPendingRequests(url, data);
            });
        }
    }, [requests]);

    useEffect(() => {
        set("SCHEDULE_REQUEST", requests);
    }, [requests]);
}
