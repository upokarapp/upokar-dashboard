import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar/sidebar";
import "./home.css";

 const home=() => {
   
    return (
        <div className="home">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}

export default home;