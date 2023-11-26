import React, { useEffect, useState } from 'react';
import '../css/MenuMission.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useMission from './hooks/useMission';
import AssignMissionDialog from './Mission/AssginMissionDialog';
import MissionTable from './Mission/MissionTable';

const MenuMission = () => {
  const {
    teams,
    missionPool,
    getMissions,
    assignMission,
    addMission,
    selectedTeam,
    setSelectedTeam,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
    filteredMissions,
    filterMissionsByCategory
  } = useMission();
  const [openAssignMission, setOpenAssignMission] = useState(false);

  // console.log(selectedTeam, selectedCategory, selectedDate)

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  
  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value)
    console.log("team Id", e.target.value)
    getMissions(selectedDate.format("YYYY_MM_DD"), e.target.value)
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleOpenMissionAssign = () => {
    setOpenAssignMission((prev) => !prev);
  };

  return (
    <div id="menu-mission-container">
      <div id="menu-mission-header">
        <div id="menu-mission-header-selector">
          <FormControl className="mui-select" id="team-select">
            <InputLabel className="mui-select-label" id="mui-select-team-label">팀 선택</InputLabel>
            <Select
              labelId="mui-select-team-label"
              value={selectedTeam}
              label="팀 선택"
              onChange={handleTeamChange}
            >
              {teams && teams.map((team) => (
                <MenuItem key={team.team_id} value={team.team_id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="mui-select" id="category-select">
            <InputLabel className="mui-select-label" id="mui-select-category-label">카테고리 선택</InputLabel>
            <Select
              labelId="mui-select-category-label"
              value={selectedCategory}
              label="카테고리 선택"
              onChange={handleCategoryChange}
            >
              {categories && categories.map((category, index) => (
                <MenuItem key={index} value={index}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="날짜"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="menu-mission-assign-button" onClick={toggleOpenMissionAssign}>
          <span>미션 할당</span>
        </div>
      </div>
      <MissionTable missions={filteredMissions} />
      <AssignMissionDialog 
        open={openAssignMission} 
        teams={teams}
        missionPool={missionPool}
        selectedDate={selectedDate}
        assignMission={assignMission}
        handleClose={toggleOpenMissionAssign} 
        addMission={addMission}
        />
    </div>
  );
};

export default MenuMission;

