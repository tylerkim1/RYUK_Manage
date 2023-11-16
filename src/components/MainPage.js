import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../css/MainPage.css'
import MenuUser from './MenuUser';
import MenuMission from './MenuMission';
import MenuTeam from './MenuTeam';
import MenuPerson from './MenuPerson';
import Header2 from './Header2';
import Sidebar from './Sidebar';

function MainPage() {
    return (
        <div id="container">
            <Header2 />
            <Sidebar />
            <div id="main">
                <Routes>
                    <Route path="menu-user" element={<MenuUser />} />
                    <Route path="menu-mission" element={<MenuMission />} />
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