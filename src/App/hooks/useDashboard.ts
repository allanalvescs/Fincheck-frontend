import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";

export function useDashboard () {
    return useContext(DashboardContext);
}