import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/MainPage.css'
import MenuUser from './MenuUser';
import MenuMission from './MenuMission';
import MenuTeam from './MenuTeam';
import MenuPerson from './MenuPerson';
import MissionAdd from './MissionAdd';
import Header2 from './Header2';
import Sidebar from './Sidebar';
import MenuStatistics from './MenuStatistics';

function MainPage() {
    return (
        <div id="container">
            <Header2 />
            <Sidebar />
            <div id="main">
                <Routes>
                    <Route path="menu-statistics" element={<MenuStatistics />} />
                    <Route path="menu-user" element={<MenuUser />} />
                    <Route path="menu-mission" element={<MenuMission />} />
                    <Route path="mission-add" element={<MissionAdd />} />
                    <Route path="menu-team" element={<MenuTeam />} />
                    <Route path="menu-person" element={<MenuPerson />} />
                    <Route path="*" element={<MenuUser />} />
                </Routes>
                <div id="footer"/>
            </div>
        </div>
    );
}

export default MainPage;