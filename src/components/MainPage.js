import React from 'react';
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import MenuUser from './MenuUser';
import MenuMission from './MenuMission';
import userImage from '../assets/user.png';
import assignmentImage from '../assets/assignment.png';

function Sidebar() {
    return (
        <div id="sidebar" style={{
            display: 'flex',
            flexDirection: 'column',
            width: '15%',
            backgroundColor: '#FFFFFF',
            position: 'fixed',  // <-- 여기에 추가
            height: 'calc(100% - 3.5rem)',
            top: '3.5rem',             // <-- 상단에 고정
            left: 0             // <-- 왼쪽에 고정 
        }}>
            <div id="title-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: '1.25rem' }}>
                <div id="title" style={{ display: 'flex', flex: 2, alignItems: 'center' }}>
                    <span style={{ fontSize: '3rem', fontWeight: '800', color: '#A6EB00' }}>
                        력습지
                    </span>
                </div>
                <div id="user" style={{ display: 'flex', flex: 1.5 }}>
                    <span style={{ fontSize: '0.75rem', color: '#AAABA7' }}>
                        환영합니다, 관리자님
                    </span>
                </div>
            </div>
            <div id="menu-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 4, paddingLeft: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#AAABA7' }}>
                    메뉴
                </span>
                <Link to="menu-user">
                    <div id="by-user" style={{ display: 'flex', alignItems: 'center', margin: '0.6rem', paddingLeft: '0.6rem' }}>
                        <img src={userImage} alt="user" style={{ width: '2rem', height: '2rem' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#000000', paddingLeft: '0.6rem' }}>
                            개인별
                        </span>
                    </div>
                </Link>
                <Link to="menu-mission">
                    <div id="by-mission" style={{ display: 'flex', alignItems: 'center', margin: '0.6rem', paddingLeft: '0.6rem' }}>
                        <img src={assignmentImage} alt="mission" style={{ width: '2rem', height: '2rem' }} />
                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#000000', paddingLeft: '0.6rem' }}>
                            미션별
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

function MainPage() {
    return (
        <div id="container" style={{ display: 'flex' }}>
            <Sidebar />
            <div id="main" style={{
                display: 'flex',
                flexDirection: 'column',
                width: '85%',
                backgroundColor: '#F5FAE9',
                marginTop: '3.5rem',
                marginLeft: '15%'
            }}>
                <Routes>
                    <Route path="menu-user" element={<MenuUser />} />
                    <Route path="menu-mission" element={<MenuMission />} />
                    <Route path="*" element={<MenuUser />} />
                </Routes>
                <div id="footer" style={{ display: 'flex', height: '10rem' }} />
            </div>
        </div>
    );
}

export default MainPage;
