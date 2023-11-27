import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import '../css/MainPage.css'
// import MenuUser from './MenuUser';
import MenuMission from './MenuMission';
import MenuTeam from './MenuTeam';
import MenuPerson from './MenuPerson';
import Sidebar from './Sidebar';
import MenuStatistics from './MenuStatistics';

function MainPage() {
    const location = useLocation();

    let currentPath = location.pathname;
    console.log(currentPath)
    // '/mainpage'로 시작하는 경우 해당 부분을 제거
    if (currentPath.startsWith('/mainpage')) {
      currentPath = currentPath.substring('/mainpage'.length);
    }

    // 현재 경로에 따라 탭 이름을 결정하는 함수
    const getTabName = (path) => {
        switch (path) {
            case '/menu-statistics':
                return '통계';
            case '/menu-mission':
                return '미션';
            case '/menu-team':
                return '팀관리';
            case '/menu-user':
                return '회원관리';
            default:
                return '통계'; // 기본값 설정
        }
    };

    // 현재 탭 이름 가져오기
    const currentTabName = getTabName(currentPath);

    return (
        <div id="mainpage-container">
            <Sidebar />
            <div id="mainpage-main">
                <div id='mainpage-main-header'>
                    <span>
                        {currentTabName}
                    </span>
                </div>
                <Routes>
                    <Route path="menu-statistics" element={<MenuStatistics />} />
                    {/* <Route path="menu-user" element={<MenuUser />} /> */}
                    <Route path="menu-mission" element={<MenuMission />} />
                    {/* <Route path="mission-add" element={<MissionAdd />} /> */}
                    <Route path="menu-team" element={<MenuTeam />} />
                    <Route path="menu-user" element={<MenuPerson />} />
                    <Route path="*" element={<MenuStatistics />} />
                </Routes>
                <div id="mainpage-footer" />
            </div>
        </div>
    );
}

export default MainPage;