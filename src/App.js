import './App.css';
import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuUser from './MenuUser';  // `/menu-user`에서 렌더링할 컴포넌트
import MenuMission from './MenuMission';  // `/menu-mission`에서 렌더링할 컴포넌트
import userImage from './assets/user.png';
import assignmentImage from './assets/assignment.png';

function App() {
  return (
    <Router>
      <div id="container" style={{ display: 'flex', height: '100vh', backgroundColor: '#F5FAE9' }}>
        <div id="sidebar" style={{ display: 'flex', flexDirection: 'column', width: '15%', backgroundColor: '#FFFFFF' }}>
          <div id="title-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: '20px' }}>
            <div id="title" style={{ display: 'flex', flex: 2, alignItems: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: '800', color: '#A6EB00' }}>
                력습지
              </span>
            </div>
            <div id="user" style={{ display: 'flex', flex: 1.5 }}>
              <span style={{ fontSize: '12px', color: '#AAABA7' }}>
                환영합니다, 관리자님
              </span>
            </div>
          </div>
          <div id="menu-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 4, paddingLeft: '20px' }}>
            <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#AAABA7' }}>
              메뉴
            </span>
            <Link to="/menu-user">
              <div id="by-user" style={{ display: 'flex', alignItems: 'center', margin: '10px', paddingLeft: '10px' }}>
                <img src={userImage} alt="user" style={{ width: '30px', height: '30px' }} />
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#000000', paddingLeft: '10px' }}>
                  개인별
                </span>
              </div>
            </Link>
            <Link to="/menu-mission">
              <div id="by-mission" style={{ display: 'flex', alignItems: 'center', margin: '10px', paddingLeft: '10px' }}>
                <img src={assignmentImage} alt="mission" style={{ width: '30px', height: '30px' }} />
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#000000', paddingLeft: '10px' }}>
                  미션별
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div id="main">
          <Routes>
            <Route path="/menu-user" element={<MenuUser />} />
            <Route path="/menu-mission" element={<MenuMission />} />
            <Route path="*" element={<MenuUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
