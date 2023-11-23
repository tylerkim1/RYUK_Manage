import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import deleteImage from '../assets/delete.png';
// import addImage from '../assets/addMember.png';
import addTeamImage from '../assets/addTeam.png';
import addTeamWhiteImage from '../assets/addTeam_white.png'
import { TextField, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { networkrequest } from './Header/XHR.js';
import { Grid } from '@mui/material';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/DemoContainer.js';

function MenuTeam() {
  const [teams, setTeams] = useState(null);
  const [teamMembers, setTeamMembers] = useState({});
  const [newTeam, setNewTeam] = useState({
    name: '',
    startDay: null,
    endDay: null,
    link: '',
    masterId: '',
    category: '',
    introduce: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => setTeams(data.data));
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  // 팀 멤버 정보 불러오기
  useEffect(() => {
    if (!teams || !teams[0] || typeof teams[0].id === 'undefined') {
      return; // 아직 데이터를 불러오지 못했다면 종료
    }

    teams.forEach(team => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://13.125.10.254:5000/user/get/?teamId=${team.id}`, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const fetchedData = JSON.parse(xhr.responseText);
          setTeamMembers(prev => ({
            ...prev,
            [team.id]: fetchedData.data,
          }));
          console.log(fetchedData.data)
        }
      };
      xhr.withCredentials = true;
      xhr.send();
    });
  }, [teams]);

  const initTeam = () => {
    setNewTeam({
      name: '',
      startDay: null,
      endDay: null,
      link: '',
      masterId: '',
      category: '',
      introduce: '',
    });
  }

  const handleSearch = () => {
    console.log('검색:', searchTerm);  // 검색 처리 로직
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    initTeam();
  };

  const addTeam = async () => {
    // URL 파라미터를 생성하기 위해 '-'를 '_'로 변경
    console.log(newTeam)
    const req = { ...newTeam };
    for (let key in req) {
      if (key === 'startDay' || key === 'endDay') req[key] = req[key].format("YYYY_MM_DD")
    }

    await networkrequest('team/add/', req, console.log);
    initTeam();
  };

  const handleDelete = (masterId, teamId) => {
    networkrequest('team/delete/', { callerId: masterId, teamId: teamId }, console.log);
  }
  
  const handleStartDayChange = (newValue) => {
    setNewTeam({ ...newTeam, startDay: newValue });
  };

  const handleEndDayChange = (newValue) => {
    setNewTeam({ ...newTeam, endDay: newValue });
  };

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <div id="menu-team-search">
          <TextField label="검색" autoComplete="off" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          />
        </div>
        <div className="menu-team-add-button" onClick={handleClickOpen}>
          <img src={addTeamWhiteImage} />
          <span>팀 추가</span>
        </div>
      </div>
      <div id="menu-team-body">
        <div className="menu-team-list">
          <Grid container spacing={1}>
            {teams ? (
              teams.map((team, teamIndex) => (
                <Grid item key={teamIndex} xs={3} className="team-block">
                  <div className="team-block-header">
                    <div className="team-block-header-text">
                      <span className="team-name">
                        {team.name}
                      </span>
                      <span className="team-period">
                        기간: {team.start_day} ~ {team.end_day}
                      </span>
                    </div>
                    <img className="delete-button" src={deleteImage} onClick={() => handleDelete(team.master_id, team.team_id)} />
                  </div>
                  {/* <div className="team-block-body">
                    <div className="team-member-list">
                      {teamMembers && teamMembers[team.id] ? (
                        teamMembers[team.id].map((member, memberIndex) => (
                          <div key={memberIndex} className="team-member">
                            <span className="member-info">
                              {member.user_name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                  </div> */}
                </Grid>
              ))) : (
              <div>Loading...</div>
            )}
          </Grid>

          <Dialog id="menu-team-add-dialog" open={open} onClose={handleClose}>
            <DialogTitle>{"팀 추가"}</DialogTitle>
            <DialogContent>
              <TextField className="menu-team-add-input" label="팀 이름" variant="outlined" fullWidth value={newTeam.name} 
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}/>
              <TextField className="menu-team-add-input" label="링크" variant="outlined" fullWidth value={newTeam.link} 
                onChange={(e) => setNewTeam({ ...newTeam, link: e.target.value })}/>
              <TextField className="menu-team-add-input" label="팀장 ID" variant="outlined" fullWidth value={newTeam.masterId} 
                onChange={(e) => setNewTeam({ ...newTeam, masterId: e.target.value })}/>
              <TextField className="menu-team-add-input" label="카테고리" variant="outlined" fullWidth value={newTeam.category} 
                onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })}/>
              <TextField className="menu-team-add-input" label="소개글" variant="outlined" fullWidth value={newTeam.introduce} 
                onChange={(e) => setNewTeam({ ...newTeam, introduce: e.target.value })}/>
                        
              <div id="menu-team-add-datepicker-wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DesktopDateTimePicker']}>
                    <DemoItem >
                      <DesktopDatePicker 
                        label="시작 날짜"
                        value={newTeam.startDay}
                        onChange={handleStartDayChange}
                        renderInput={(params) => <TextField {...params} error={false}/>}/>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <span> ~ </span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DesktopDateTimePicker']}>
                    <DemoItem >
                      <DesktopDatePicker 
                        label="종료 날짜"
                        value={newTeam.endDay}
                        onChange={handleEndDayChange}
                        renderInput={(params) => <TextField {...params} error={false}/>}/>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </DialogContent>
            <DialogActions>
              <div className="menu-team-add-button" onClick={addTeam}>
                <span>팀 만들기</span>
              </div>
              <Button onClick={handleClose}>취소</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MenuTeam;
