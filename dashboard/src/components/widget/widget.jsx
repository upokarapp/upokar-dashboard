// Widget.js
import React, { useEffect, useState } from "react";
import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person4Icon from '@mui/icons-material/Person4';
import { Link } from "react-router-dom";
import { getTotalCounts } from "../../Api";

const Widget = () => {

  const defaultTotalCounts = { // Define default totalCounts object
    totalUsers: 1000,
    totalProducts: 1000,
    totalOrders: 1000,
    totalAdmins: 1000,
  };

  const [totalCounts, setTotalCounts] = useState(defaultTotalCounts); // Initialize state with default values

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTotalCounts();
        if (response) { // Update only if API call is successful and returns a response
          setTotalCounts(response);
        }
      } catch (apiError) {
        console.error("Error fetching total counts:", apiError);
        // If API call fails, defaultTotalCounts will be used anyway as initial state
      }
    };
    fetchData();
  }, []);

  const widgetTypes = [
    "totalUsers",
    "totalProducts",
    "totalOrders",
    "totalAdmins",
  ];

  return (
    <div className="widgets">
      {widgetTypes.map((type) => {
        let data;

        switch (type) {
          case "totalUsers":
            data = {
              title: "Customers",
              to: "customers",
              link: "See all customers",
              icon: (
                <PersonOutlinedIcon
                  className="icon"
                  style={{
                    color: "#0d6efd",
                    backgroundColor: "rgb(255, 255, 255,.5)",
                  }}
                />
              ),
            };
            break;
          case "totalProducts":
            data = {
              title: "Products",
              to: "products",
              link: "View all products",
              icon: (
                <Person4Icon
                  className="icon"
                  style={{
                    color: "#198754",
                    backgroundColor: "rgb(255, 255, 255,.5)",
                  }}
                />
              ),
            };
            break;
          case "totalOrders":
            data = {
              title: "Orders",
              to: "orders",
              isMoney: true,
              link: "View all orders",
              icon: (
                <CreditCardIcon
                  className="icon"
                  style={{ backgroundColor: "rgb(255, 255, 255,.5)", color: "#f3b805" }}
                />
              ),
            };
            break;
          case "totalAdmins":
            data = {
              title: "Admins",
              to: "admins",
              isMoney: true,
              link: "View all admins",
              icon: (
                <AccountCircleIcon
                  className="icon"
                  style={{
                    backgroundColor: "rgb(255, 255, 255,.5)",
                    color: "#dc3545",
                  }}
                />
              ),
            };
            break;
          default:
            data = {};
            break;
        }

        return (
          <div key={type} className="widget">
            <div className="left">
              <span className="title">{data.title}</span>
              <span className="counter">
                {totalCounts[type]} {/* Use fetched count or default if not available */}
              </span>
              <Link to={`/${data.to}`} className="link">{data.link}</Link>
            </div>
            <div className="right">
              {data.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
