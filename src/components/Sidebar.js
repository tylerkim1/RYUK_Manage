import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userImage from '../assets/user.png';
import teamImage from '../assets/team.png';
import assignmentImage from '../assets/assignment.png';
import personImage from '../assets/person.png';
import '../css/Sidebar.css';  // CSS import

const MenuItem = ({ to, image, label, isSelected, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className={`menu-item ${isSelected ? "selected-tab" : ""}`}>
      <img src={image} alt={label} />
      <span>{label}</span>
    </div>
  </Link>
);

function Sidebar() {
  const [selectedTab, setSelectedTab] = useState("menu-user");  // 초기 탭 설정

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const userLoginString = localStorage.getItem('user_login');
  const userLoginArray = JSON.parse(userLoginString); // 문자열을 객체 배열로 변환
  const userName = userLoginArray[0].name; // 첫 번째 객체의 'name' 속성을 추출
  
  return (
    <div id="sidebar">
      <div id="title-wrapper">
        <div id="user">
          <span>환영합니다, </span>
          <span>{userName}님. </span>
        </div>
      </div>
      <div id="menu-wrapper">
        <span>메뉴</span>
        <MenuItem to="menu-user" image={userImage} label="개인별" isSelected={selectedTab === "menu-user"} onClick={() => handleTabClick("menu-user")}
        />
        <MenuItem to="menu-mission" image={assignmentImage} label="미션별" isSelected={selectedTab === "menu-mission"} onClick={() => handleTabClick("menu-mission")}
        />
        <MenuItem to="menu-team" image={teamImage} label="팀별 관리" isSelected={selectedTab === "menu-team"} onClick={() => handleTabClick("menu-team")}
        />
        <MenuItem to="menu-person" image={personImage} label="회원관리" isSelected={selectedTab === "menu-person"} onClick={() => handleTabClick("menu-person")}
        />
      </div>
    </div>
  );
}

export default Sidebar;
