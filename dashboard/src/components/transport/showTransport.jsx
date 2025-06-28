import React, { useState } from 'react';
import './showTransport.css';
import Car from "./car"
import Bus from "./bus"
import Truck from "./truck"
import CNG from "./cng"
import Bike from "./bike"
import Leguna from "./leguna"


const TabBar = () => {
  const [activeTab, setActiveTab] = useState('car');

  const tabs = [
    { id: 'car', label: 'Car', component: <Car /> },
    { id: 'bus', label: 'Bus', component: <Bus /> },
    { id: 'truck', label: 'Truck', component: <Truck /> },
    { id: 'cng', label: 'CNG', component: <CNG /> },
    { id: 'bike', label: 'Bike', component: <Bike /> },
    { id: 'leguna', label: 'Leguna', component: <Leguna /> }
  ];

  return (
    <div className="tab-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default TabBar;