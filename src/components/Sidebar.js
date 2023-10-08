import React from 'react';
import { Link } from 'react-router-dom';
import userImage from '../assets/user.png';
import teamImage from '../assets/team.png';
import assignmentImage from '../assets/assignment.png';
import personImage from '../assets/person.png';
import '../css/Sidebar.css';  // CSS import

const MenuItem = ({ to, image, label }) => (
  <Link to={to}>
    <div className="menu-item">
      <img src={image} alt={label} />
      <span>{label}</span>
    </div>
  </Link>
);

function Sidebar() {
  return (
    <div id="sidebar">
      <div id="title-wrapper">
        <div id="title">
          <span>력습지</span>
        </div>
        <div id="user">
          <span>환영합니다, 관리자님</span>
        </div>
      </div>
      <div id="menu-wrapper">
        <span>메뉴</span>
        <MenuItem to="menu-user" image={userImage} label="개인별" />
        <MenuItem to="menu-mission" image={assignmentImage} label="미션별" />
        <MenuItem to="menu-team" image={teamImage} label="팀별 관리" />
        <MenuItem to="menu-person" image={personImage} label="회원관리" />
      </div>
    </div>
  );
}

export default Sidebar;
