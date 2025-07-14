import { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  // Import the MUI icon
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddHome from '@mui/icons-material/AddHome';
import AddCircle from '@mui/icons-material/AddCircle';
import AddReaction from '@mui/icons-material/AddReaction';
import PhotoIcon from '@mui/icons-material/Photo';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocalHospital from '@mui/icons-material/LocalHospital';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import LocalPharmacy from '@mui/icons-material/LocalPharmacy';
import PetsIcon from '@mui/icons-material/Pets';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // For Diagnostic
import PersonIcon from '@mui/icons-material/Person';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Notifications from '@mui/icons-material/Notifications';
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuIconRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar if user clicks outside of it (and the menu icon)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handler to close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const logOut = () => {
    handleLinkClick();
    dispatch({ type: "LOGOUT" });
  };
  const sidebarItems = [
    { type: 'title', text: 'MAIN' },
    {
      type: 'link',
      to: '/',
      icon: <DashboardIcon className="icon" />,
      text: 'Dashboard',
    },
    { type: 'title', text: 'LISTS' },
    {
      type: 'link',
      to: '/customers',
      icon: <PersonOutlineIcon className="icon" />,
      text: 'Customers',
    },
    {
      type: 'link',
      to: '/products',
      icon: <ProductionQuantityLimitsIcon className="icon" />,
      text: 'Products',
    },
    {
      type: 'link',
      to: '/addProduct',
      icon: <AddCircle className="icon" />,
      text: 'Add Product',
    },
    {
      type: 'link',
      to: '/addProductLink',
      icon: <AddLinkIcon className="icon" />,
      text: 'Add ProductLink',
    },
    {
      type: 'link',
      to: '/orders',
      icon: <ShoppingCartIcon className="icon" />,
      text: 'Orders',
    },
    {
      type: 'link',
      to: '/giftorders',
      icon: <LocalMallIcon className="icon" />,
      text: 'GiftOrders',
    },
    {
      type: 'link',
      to: '/kutirorders',
      icon: <ShoppingBasketIcon className="icon" />,
      text: 'KutirOrders',
    },
    {
      type: 'link',
      to: '/groceryorders',
      icon: <AddShoppingCart className="icon" />,
      text: 'GroceryOrders',
    },
    {
      type: 'link',
      to: '/hospitals',
      icon: <LocalHospital className="icon" />,
      text: 'Hospitals',
    },
    {
      type: 'link',
      to: '/diagnostics',
      icon: <MedicalServicesIcon className="icon" />,
      text: 'Diagnostics',
    },
    {
      type: 'link',
      to: '/doctors',
      icon: <PersonIcon className="icon" />,
      text: 'Doctors',
    },
    {
      type: 'link',
      to: '/bloodDonors',
      icon: <BloodtypeIcon className="icon" />,
      text: 'Blood Donors',
    },
    {
      type: 'link',
      to: '/ambulances',
      icon: <LocalCarWashIcon className="icon" />,
      text: 'Ambulances',
    },
    {
      type: 'link',
      to: '/pharmacies',
      icon: <LocalPharmacy className="icon" />,
      text: 'Pharmacies',
    },
    {
      type: 'link',
      to: '/homeopathy',
      icon: <LocalHospital className="icon" />,
      text: 'Homeopathy',
    },
    {
      type: 'link',
      to: '/community-centers',
      icon: <HomeWorkIcon className="icon" />,
      text: 'CommunityCenters',
    },
    {
      type: 'link',
      to: '/animals',
      icon: <PetsIcon className="icon" />,
      text: 'animals',
    },
    {
      type: 'link',
      to: '/transport',
      icon: <DirectionsCarIcon className="icon" />,
      text: 'Transport',
    },
    {
      type: 'link',
      to: '/cylinder',
      icon: <AddHome className="icon" />,
      text: 'Cylinder',
    },
    {
      type: 'link',
      to: '/images',
      icon: <PhotoIcon className="icon" />,
      text: 'Images',
    },
    {
      type: 'link',
      to: '/gimages',
      icon: <PhotoIcon className="icon" />,
      text: 'GImages',
    },
    {
      type: 'link',
      to: '/jobs',
      icon: <AddReaction className="icon" />,
      text: 'Jobs',
    },
    {
      type: 'link',
      to: '/tuitions',
      icon: <InsertChartIcon className="icon" />,
      text: 'Tuitions',
    },
    {
      type: 'link',
      to: '/skillandit',
      icon: <AcUnitIcon className="icon" />,
      text: 'Skill & IT',
    },
    {
      type: 'link',
      to: '/kutirshilpo',
      icon: <ShoppingBasketIcon className="icon" />,
      text: 'Kutir Shilpo',
    },
    {
      type: 'link',
      to: '/gifts',
      icon: <CardGiftcardIcon className="icon" />,
      text: 'Gifts',
    },
    {
      type: 'link',
      to: '/labors',
      icon: <ManageAccountsIcon className="icon" />,
      text: 'Labors',
    },
    {
      type: 'link',
      to: '/volunteers',
      icon: <GppGoodIcon className="icon" />,
      text: 'Volunteers',
    },
    {
      type: 'link',
      to: '/lostpersons',
      icon: <PersonSearchIcon className="icon" />,
      text: 'Lost Persons',
    },
    {
      type: 'link',
      to: '/admins',
      icon: <AccountCircleIcon className="icon" />,
      text: 'Admins',
    },
    {
      type: 'link',
      to: '/notifications',
      icon: <Notifications className="icon" />,
      text: 'Notification',
    },
    { type: 'title', text: 'USER' },
    {
      type: 'link',
      to: '/profile',
      icon: <AccountCircleOutlinedIcon className="icon" />,
      text: 'Profile',
    },
    {
      type: 'logout',
      icon: <ExitToAppIcon className="icon" />,
      text: 'Logout',
    }
  ];
  return (
    <>
      {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleSidebar} ref={menuIconRef}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className="mobileBar">
        <div className="">
          <NavLink to="/" style={{ textDecoration: "none" }} onClick={handleLinkClick}>
          </NavLink>
        </div>
        <hr />
        <div className="">
          <ul>
            {sidebarItems.map((item, index) => {
              if (item.type === 'title') {
                return null; // Titles are likely not needed for mobile icon-only view
              } else if (item.type === 'link') {
                return (
                  <NavLink
                    key={index}
                    to={item.to}
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                    activeClassName="active"
                    title={item.text} // Add tooltip for accessibility on mobile
                  >
                    <li>
                      {item.icon}
                    </li>
                  </NavLink>
                );
              } else if (item.type === 'logout') {
                return (
                  <li key={index} onClick={logOut} title={item.text}> {/* Add tooltip for accessibility on mobile */}
                    {item.icon}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
      {/* Sidebar */}
      <div id="sidebar" ref={sidebarRef} className={isOpen ? "open" : ""}>
        <div className="top">
          <NavLink to="/" style={{ textDecoration: "none" }} onClick={handleLinkClick}>
            <span className="logo">Admin Panel</span>
          </NavLink>
        </div>
        <hr />
        <div className="center">
          <ul>
            {sidebarItems.map((item, index) => {
              if (item.type === 'title') {
                return <p key={index} className="title">{item.text}</p>;
              } else if (item.type === 'link') {
                return (
                  <NavLink
                    key={index}
                    to={item.to}
                    style={{ textDecoration: "none" }}
                    onClick={handleLinkClick}
                    activeClassName="active"
                  >
                    <li>
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  </NavLink>
                );
              } else if (item.type === 'logout') {
                return (
                  <li key={index} onClick={logOut}>
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                );
              }
              return null; // in case of any other type, though not expected here
            })}
          </ul>
        </div>
      </div>

      {/* Inline styles for responsiveness */}
      <style>{`
        .menu-icon {
          display: none;
          position: absolute;
          top: 15px;
          left: 15px;
          cursor: pointer;
          font-size: 24px;
          z-index: 1001;
        }
        .mobileBar{
        display: none;
        }
        #sidebar {
          transition: transform 0.3s ease-in-out;
        }

        @media (max-width: 768px) {
          .menu-icon {
            display: block;
          }
          .mobileBar{
            display: block;
            margin-top: 50px;
            z-index: 100;
           }
          .mobileBar li{
            text-align: center;
            margin-bottom: 10px;
           }
          .mobileBar li{
            color: #000;
           }
          .mobileBar .active li {
            color: #007bff;
            background-color: rgba(15, 136, 239, 0.2);
           }
          .mobileBar li .icon {
            font-size: 20px;
            color: #007bff;
          }
          #sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100vh;
            background: white;
            box-shadow: 2px 0 5px rgba(0,0,0,0.2);
            transform: translateX(-100%);
            z-index: 1000;
          }
          #sidebar.open {
            transform: translateX(0);
          }
        }

        .active {
          font-weight: bold;
          color: #007bff;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
