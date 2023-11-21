import React, { useState } from 'react';
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
  if(teamLists === undefined) networkrequest('team/all/', {}, (data) => {setTeamLists(data.data);});

  // 현재 위치 (URL)을 얻습니다.
  const location = useLocation();
  let currentPath = location.pathname;
  // '/mainpage'로 시작하는 경우 해당 부분을 제거
  if (currentPath.startsWith('/mainpage')) {
    currentPath = currentPath.substring('/mainpage'.length);
  }
  // 초기 탭을 현재 URL에 따라 설정
  let initialTab;
  switch (currentPath) {
    case '/menu-statistics':
      initialTab = 'menu-statistics';
      break;
    case '/menu-mission':
      initialTab = 'menu-mission';
      break;
    case '/menu-team':
      initialTab = 'menu-team';
      break;
    case '/menu-user':
      initialTab = 'menu-user';
      break;
    default:
      initialTab = 'menu-statistics';
  }
  const [selectedTab, setSelectedTab] = useState(initialTab);
  // 탭을 클릭할 때 상태를 변경하는 함수
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  // 로컬 스토리지에서 사용자 정보를 가져옵니다.
  const userLoginString = localStorage.getItem('user_login');
  const userLoginArray = JSON.parse(userLoginString);
  const userName = userLoginArray[0].name;

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
