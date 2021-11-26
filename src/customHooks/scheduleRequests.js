import { useEffect, useState } from "react";
import { get } from "idb-keyval";

export function useScheduleRequests() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        get("SCHEDULE_REQUEST")
            .then((data) => {
                console.log("[useScheduleRequests]", data);
            })
            .catch((err) =>
                console.error("[useScheduleRequests]", err.message)
            );
    });
}
