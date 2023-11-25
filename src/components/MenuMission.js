import React, { useEffect, useState } from 'react';
import '../css/MenuMission.css'
import missionImage from '../assets/sample.png';
import { Link } from 'react-router-dom';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { networkrequest } from './Header/XHR';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useMission from './hooks/useMission';
import dayjs from 'dayjs';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AssignMissionDialog from './Mission/AssginMissionDialog';

// 스타일을 적용한 컴포넌트들을 정의합니다.
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  // marginTop: theme.spacing(3),
  width: "100%",
}));

const MenuMission = () => {
  const { teams, missionPool, missions, getMissions, assignMission } = useMission();
  const [selectedMission, setSelectedMission] = useState();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const categories = ['전체', '매일하력', '시도해력', '마음봄력', '유유자력', '레벨업력'];
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [openAssignMission, setOpenAssignMission] = useState(false);

  useEffect(() => {
    if (selectedTeam) {
      getMissions(selectedDate, selectedTeam);
    }
  }, [selectedTeam, selectedDate, getMissions]);

  useEffect(() => {
    if (selectedCategory === 0) { // "전체" category selected
      setFilteredMissions(missions);
    } else {
      const filtered = missions.filter(mission => mission.category === categories[selectedCategory]);
      setFilteredMissions(filtered);
    }
  }, [selectedCategory, missionPool]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const toggleOpenMissionAssign = () => {
    setOpenAssignMission((prev) => !prev);
  };

  return (
    <div id="menu-mission-container">
      <div id="menu-mission-header">
        <div id="menu-mission-header-selector">
          <FormControl className="menu-mission-select" id="menu-mission-team-select">
            <InputLabel className="menu-mission-select-label" id="menu-mission-team-select-label">팀 선택</InputLabel>
            <Select
              labelId="team-select-label"
              value={selectedTeam}
              label="팀 선택"
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              {teams && teams.map((team) => (
                <MenuItem key={team.team_id} value={team.team_id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="menu-mission-select" id="menu-mission-category-select">
            <InputLabel className="menu-mission-select-label" id="menu-mission-category-select-label">카테고리 선택</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="카테고리 선택"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories && categories.map((category, index) => (
                <MenuItem key={index} value={index}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        
        <div className="menu-team-add-button" onClick={toggleOpenMissionAssign}>
          <span>미션 할당</span>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <StyledTableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>미션 제목</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>성취율</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMissions.map((mission) => (
              <TableRow key={mission.mission_id}>
                <TableCell>{mission.title}</TableCell>
                <TableCell>{mission.category}</TableCell>
                <TableCell>{mission.achievementRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <AssignMissionDialog 
        open={openAssignMission} 
        teams={teams}
        missionPool={missionPool}
        assignMission={assignMission}
        handleClose={toggleOpenMissionAssign} 
        />
      {/* <div>
        <span>미션을 고르세요</span>
        <select value={selectedMission} onChange={(e) => setSelectedMission(e.target.value)}>
          {missionPool ? missionPool.map(mission => (
            <option key={mission.mission_id} value={mission.mission_id}>{mission.title}</option>
          )) : <div></div>}
        </select>
        <span>팀을 고르세요</span>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
          {teams ? teams.map(team => (
            <option key={team.team_id} value={team.team_id}>{team.name}</option>
          )) : ''}
        </select>
        <button onClick={() => handleAddMissionToTeam(selectedMission, selectedTeam)}>팀에 미션 추가하기</button>
      </div>
      <Link to={'/mainpage/mission-add'}>
        <button>미션 풀 추가 페이지로 가기</button>
      </Link> */}
    </div>
  );
};

export default MenuMission;

