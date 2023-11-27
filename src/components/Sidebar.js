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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 메뉴 아이템 컴포넌트
const MenuItem = ({ to, image, selectedImage, label, isSelected, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className='menu-item'>
      {image ? <img src={isSelected ? selectedImage : image} alt={label} /> : ''}
      <span>{label}</span>
    </div>
  </Link>
);

// 사이드바 컴포넌트
function Sidebar() {
  const [withdrawnUsers, setWithdrawnUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const location = useLocation();
  // const userName = JSON.parse(localStorage.getItem('user_login')).user_name;

  useEffect(() => {
    // networkrequest('team/all/', {}, (data) => {
    //   setTeamLists(data.data);
    // });
    fetchWithdrawUser();

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

  useEffect(() => {
    fetchWithdrawUser();
  }, [withdrawnUsers]);

  const fetchWithdrawUser = () => {
    networkrequest('team/userWithdrawn/', {}, (data) => {
      setWithdrawnUsers(data.data);
    })
  }

  const withdrawUser = (userId, teamId, acceptOrNot) => {
    const req = {
      userId: userId,
      teamId: teamId,
      acceptOrNot: acceptOrNot
    }
    networkrequest('user/eraseTeam/', req, (data) => {
      if (data.status === "ok") alert("탈퇴하였습니다.");
    });
  }
  
  // 탭을 클릭할 때 상태를 변경하는 함수
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const toggleWithdrawDialog = () => {
    setOpenWithdrawDialog((prev) => !prev);
  }

  const handleWithdraw = (userId, teamId, isAccept) => {
    withdrawUser(userId, teamId, isAccept)
    // setOpenApplyConfirm((prev) => !prev)
    // handleClose();
  }


  return (
    <div id="sidebar">
      <div id="sidebar-header-wrapper">
        <img id="sidebar-logo" src={logoImage} />
        {/* <div id="sidebar-user">
          <span>환영합니다, {userName}님.</span>
        </div> */}
      </div>
      <div id="sidebar-menu-wrapper">
        <MenuItem to="menu-statistics" image={statisticsImage} selectedImage={statisticsImageSelected} label="통계" isSelected={selectedTab === "menu-statistics"} onClick={() => handleTabClick("menu-statistics")} />
        <MenuItem to="menu-mission" image={missionImage} selectedImage={missionImageSelected} label="미션" isSelected={selectedTab === "menu-mission"} onClick={() => handleTabClick("menu-mission")} />
        <MenuItem to="menu-team" image={teamImage} selectedImage={teamImageSelected} label="팀관리" isSelected={selectedTab === "menu-team"} onClick={() => handleTabClick("menu-team")} />
        <MenuItem to="menu-user" image={userImage} selectedImage={userImageSelected} label="회원관리" isSelected={selectedTab === "menu-user"} onClick={() => handleTabClick("menu-user")} />
        <div className="menu-item" id="withdrawal-menu" onClick={toggleWithdrawDialog}>
          <span>탈퇴 요청</span>
          <div id="withdrawal-number">
            <span>12</span>
          </div>
        </div>
      </div>
      <Dialog open={openWithdrawDialog} onClose={() => setOpenWithdrawDialog(false)}>
        <DialogTitle>탈퇴 요청 목록</DialogTitle>
        <DialogContent>
          <List>
            {withdrawnUsers ? withdrawnUsers.map((user) => {
              <ListItem>
                <IconButton onClick={() => handleWithdraw(user.user_id, user.team_id, 0)}>
                  <CloseIcon />
                </IconButton>
                {user.nickname}님이 {user.team_name}에서 나가고 싶어합니다.
                <div id="withdrawal-dialog-withdrawl-accept-button" onClick={() => handleWithdraw(user.user_id, user.team_id, 1)}>
                  <span>탈퇴</span>
                </div>
              </ListItem>
            }) : ''}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdrawDialog(false)}>취소</Button>
        </DialogActions>
      </Dialog>
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
