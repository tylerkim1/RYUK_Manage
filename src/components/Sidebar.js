import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { networkrequest } from './Header/XHR';
import teamImage from '../assets/team.png';
import teamImageSelected from '../assets/team_colored.png'
import missionImage from '../assets/mission.png';
import missionImageSelected from '../assets/mission_colored.png'
import userImage from '../assets/user.png';
import userImageSelected from '../assets/user_colored.png'
import statisticsImage from '../assets/statistic.png'
import statisticsImageSelected from '../assets/statistic_colored.png'
import logoImage from '../assets/Logo.png';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Sidebar.css';

// 메뉴 아이템 컴포넌트
const MenuItem = ({ to, image, selectedImage, label, isSelected, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className='menu-item'>
      <img src={isSelected ? selectedImage : image} alt={label} />
      <span>{label}</span>
    </div>
  </Link>
);

// 사이드바 컴포넌트
function Sidebar() {
  const [teamLists, setTeamLists] = useState();
  const [selectedTab, setSelectedTab] = useState(null);
  const location = useLocation();
  const userName = JSON.parse(localStorage.getItem('user_login')).user_name;
  if(teamLists === undefined) networkrequest('team/all/', {}, (data) => {setTeamLists(data.data);});

  useEffect(() => {
    // 네트워크 요청은 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    networkrequest('team/all/', {}, (data) => {
      setTeamLists(data.data);
    });

    // 현재 경로를 기반으로 초기 탭을 설정합니다.
    let currentPath = location.pathname.replace('/mainpage', '');
    switch (currentPath) {
      case '/menu-statistics':
        setSelectedTab('menu-statistics');
        break;
      case '/menu-mission':
        setSelectedTab('menu-mission');
        break;
      case '/menu-team':
        setSelectedTab('menu-team');
        break;
      case '/menu-user':
        setSelectedTab('menu-user');
        break;
      default:
        setSelectedTab('menu-statistics');
    }
  }, [location.pathname]); // location.pathname가 변경될 때만 이 효과를 실행합니다.
  
  // 탭을 클릭할 때 상태를 변경하는 함수
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div id="sidebar">
      <div id="sidebar-header-wrapper">
        <img id="sidebar-logo" src={logoImage} />
        <div id="sidebar-user">
          <span>환영합니다, {userName}님.</span>
        </div>
      </div>
      <div id="sidebar-menu-wrapper">
        <MenuItem to="menu-statistics" image={statisticsImage} selectedImage={statisticsImageSelected} label="통계" isSelected={selectedTab === "menu-statistics"} onClick={() => handleTabClick("menu-statistics")} />
        <MenuItem to="menu-mission" image={missionImage} selectedImage={missionImageSelected} label="미션" isSelected={selectedTab === "menu-mission"} onClick={() => handleTabClick("menu-mission")} />
        <MenuItem to="menu-team" image={teamImage} selectedImage={teamImageSelected} label="팀관리" isSelected={selectedTab === "menu-team"} onClick={() => handleTabClick("menu-team")} />
        <MenuItem to="menu-user" image={userImage} selectedImage={userImageSelected} label="회원관리" isSelected={selectedTab === "menu-user"} onClick={() => handleTabClick("menu-user")} />
      </div>
      <div id="sidebar-footer">
        <Link to="/login">
          <div id="logout-button">
            <span>로그아웃</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
