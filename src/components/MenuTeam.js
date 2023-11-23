import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import addTeamWhiteImage from '../assets/addTeam_white.png';
import useTeam from '../hooks/useTeam.js';
import TeamAddDialog from './Team/TeamAddDialog.js';
import TeamInfoDialog from './Team/TeamInfoDialog.js';
import TeamList from './Team/TeamList.js';

function MenuTeam() {
  const { teams, newTeam, setNewTeam, initTeam, addTeam, deleteTeam } = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [openTeamAdd, setOpenTeamAdd] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // 검색어가 변경될 때마다 팀 목록을 필터링합니다.
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = teams.filter((team) =>
        team.name.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredTeams(filtered);
    } else {
      setFilteredTeams(teams); // 검색어가 없으면 모든 팀을 보여줍니다.
    }
  }, [searchTerm, teams]);

  
  // 검색 버튼 클릭 또는 엔터키를 눌렀을 때 실행될 검색 함수
  const handleSearch = () => {
    // 검색어를 소문자로 변환
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    // 검색어가 포함된 팀을 필터링
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    // 필터링된 팀 목록으로 상태 업데이트
    setFilteredTeams(filtered);
  };

  // 검색 필드에서 엔터키를 눌렀을 때 검색 실행
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const toggleOpenTeamAdd = () => {
    setOpenTeamAdd((prev) => !prev);
    if (!openTeamAdd) {
      initTeam(); // 팀 추가 다이얼로그를 열 때 초기화
    }
  };

  const toggleOpenTeam = (team) => {
    setSelectedTeam(team);
    setOpenTeam((prev) => !prev);
  };

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <div id="menu-team-search" autoComplete="chrome-off">
          <TextField
            label="검색"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              autocomplete: 'off',
              form: {
                autocomplete: 'off',
              },
            }}
            autoComplete="off"
          />
        </div>
        <div className="menu-team-add-button" onClick={toggleOpenTeamAdd}>
          <img src={addTeamWhiteImage} />
          <span>팀 추가</span>
        </div>
      </div>
      <div id="menu-team-body">
        <div className="menu-team-list">
          <TeamList teams={filteredTeams} handleTeamSelect={toggleOpenTeam} handleDeleteTeam={deleteTeam} />
          <TeamInfoDialog open={openTeam} handleClose={() => setOpenTeam(false)} selectedTeam={selectedTeam} />
          <TeamAddDialog
            open={openTeamAdd}
            handleClose={toggleOpenTeamAdd}
            newTeam={newTeam}
            setNewTeam={setNewTeam}
            addTeam={addTeam}
            initTeam={initTeam}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuTeam;
