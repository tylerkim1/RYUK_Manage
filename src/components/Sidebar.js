import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { networkrequest } from './Header/XHR';
import userImage from '../assets/user.png';
import teamImage from '../assets/team.png';
import assignmentImage from '../assets/assignment.png';
import personImage from '../assets/person.png';
import selectTeamImage from '../assets/sidebar-team.png'
import logoImage from '../assets/Logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Sidebar.css';

// 메뉴 아이템 컴포넌트
const MenuItem = ({ to, image, label, isSelected, isMissionCategory, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className={`menu-item ${isSelected ? "selected-tab" : ""}`} id={`${isMissionCategory ? "sidebar-mission-category" : ""}`}>
      <img src={image} alt={label} />
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
    case '/menu-user':
      initialTab = 'menu-user';
      break;
    case '/menu-mission':
      initialTab = 'menu-mission';
      break;
    case '/menu-team':
      initialTab = 'menu-team';
      break;
    case '/menu-person':
      initialTab = 'menu-person';
      break;
    default:
      initialTab = 'menu-user';
  }

  // 상태 변수 설정
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [startDate, setStartDate] = useState(new Date());

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
      <div id="sidebar-title-wrapper">
        <div id="sidebar-user">
          <img id="sidebar-logo" src={logoImage} />
          <span>환영합니다, {userName}님.</span>
        </div>
      </div>
      <div id="sidebar-menu-wrapper">
        <span>메뉴</span>
        <MenuItem to="menu-statistics" image={selectTeamImage} label="통계" isSelected={selectedTab === "menu-statistics"} onClick={() => handleTabClick("menu-statistics")} />
        {/* <MenuItem to="menu-user" image={userImage} label="개인별" isSelected={selectedTab === "menu-user"} onClick={() => {
          handleTabClick("menu-user");
          handleClickOpen();
        }} /> */}
        <MenuItem to="menu-mission" image={assignmentImage} label="미션 확인" isSelected={selectedTab === "menu-mission"} onClick={() => handleTabClick("menu-mission")} />
        <MenuItem to="menu-team" image={teamImage} label="팀 관리" isSelected={selectedTab === "menu-team"} onClick={() => handleTabClick("menu-team")} />
        <MenuItem to="menu-person" image={personImage} label="회원 관리" isSelected={selectedTab === "menu-person"} onClick={() => handleTabClick("menu-person")} />
      </div>
    </div>
  );
}

export default Sidebar;
