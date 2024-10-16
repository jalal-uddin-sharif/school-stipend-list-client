import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import Overview from "../Dashboard/Overview/Overview";
import AddNewData from "../Dashboard/AddNewData/AddNewData";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/",
                element: <Overview/>
            },
            {
                path: "add-new-data",
                element: <AddNewData/>
            },
        ]
    }
])