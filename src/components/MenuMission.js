import React, { useEffect, useState } from 'react';
import missionImage from '../assets/sample.png';
import { Link } from 'react-router-dom';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import '../css/MenuMission.css'
import { networkrequest } from './Header/XHR';

const MenuMission = (e) => {
  const [missionPool, setMissionPool] = useState();
  const [selectedMission, setSelectedMission] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [teamLists, setTeamLists] = useState();
  if(teamLists === undefined) networkrequest('team/all/', {}, (data) => {setTeamLists(data.data);});
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (teamLists && teamLists.length > 0 && !selectedTeam) {
      setSelectedTeam(teamLists[0].name);
    }
  }, [teamLists]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // 미션 데이터 배열
  const missions1 = [
    {
      title: '미션 1',
      achieveLevel: '3/3',
      participants: [
        { name: '쿵짝님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵쿵님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵야님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' }
      ]
    },
    {
      title: '미션 2',
      achieveLevel: '2/3',
      participants: [
        { name: '쿵짝님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵쿵님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵야님', image: null, desc: '아직 미션을 완료하지 못했어요.' }
      ]
    }
  ];

  if(missionPool === undefined) networkrequest('mission/all/', {}, (data) => (setMissionPool(data.data)))
  
  const handleAddMissionToTeam = (missionId, teamId) => {
    console.log(missionId, teamId)
    const req = {
      date: "2023_11_16",
      teamId: teamId,
      missionId: missionId
    }
    
    networkrequest('mission/assign_team/', req, console.log)
  }

  // 필터링된 팀 리스트를 반환하는 함수
  const filteredTeams = () => {
    if (!teamLists) return [];
    return teamLists.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };
  
  return (
    
    <div id="menu-mission-container">
      <div id="menu-mission-header">
        <span onClick={handleClickOpen}>{selectedTeam}</span>
        <div id="date">
          {/* <span id="date-text">{startDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            customInput={<button>📅</button>}
          /> */}
          {/* <DesktopDatePicker
            label="날짜 선택"
            inputFormat="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DesktopDateTimePicker']}>
            <DemoItem>
              <DesktopDatePicker />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"미션을 확인할 팀을 선택하세요."}</DialogTitle>
        <DialogContent>
          <TextField 
            label="팀 검색" 
            variant="outlined" 
            fullWidth 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <List>
            {filteredTeams().map((team, index) => (
              <ListItem button key={index} onClick={() => { setSelectedTeam(team.name); handleClose(); }}>
                {team.name}
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
      <div id="menu-mission-body">
        <div id="common-mission-list">
          {missions1.map((mission, missionIndex) => (
            <div key={missionIndex} id="common-mission">
              <div id="common-mission-header">
                <div id="common-mission-title">
                  <span>{mission.title}</span>
                </div>
                <div id="common-mission-achieve-level">
                  <span>달성률: {mission.achieveLevel}</span>
                </div>
              </div>
              <div id="common-mission-body">
                <div id="common-mission-personal-list">
                  {mission.participants.map((participant, participantIndex) => (
                    <div key={participantIndex} id="common-mission-personal" style={{ backgroundColor: participant.image ? '#ADFF0026' : '#FF000026' }}>
                      <div id="common-mission-personal-name">
                        <span>{participant.name}</span>
                      </div>
                      {participant.image && (
                        <div id="common-mission-personal-image">
                          <img src={participant.image} alt="user" />
                        </div>
                      )}
                      <div id="common-mission-personal-desc" style={{ alignItems: participant.image ? 'flex-start' : 'center' }}>
                        <span>{participant.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span>미션을 고르세요</span>
        <select value={selectedMission} onChange={(e) => setSelectedMission(e.target.value)}>
          {missionPool ? missionPool.map(mission => (
            <option key={mission.mission_id} value={mission.mission_id}>{mission.title}</option>
          )) : <div></div>}
        </select>
        <span>팀을 고르세요</span>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
          {teamLists ? teamLists.map(team => (
            <option key={team.team_id} value={team.team_id}>{team.name}</option>
          )) : ''}
        </select>
        <button onClick={() => handleAddMissionToTeam(selectedMission, selectedTeam)}>팀에 미션 추가하기</button>
      </div>
      <Link to={'/mainpage/mission-add'}>
        <button>미션 풀 추가 페이지로 가기</button>
      </Link>
    </div>
  );
};

export default MenuMission;