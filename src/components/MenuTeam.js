import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import addTeamWhiteImage from '../assets/addTeam_white.png';
import useTeam from './hooks/useTeam.js';
import TeamAddDialog from './Team/TeamAddDialog.js';
import TeamInfoDialog from './Team/TeamInfoDialog.js';
import TeamList from './Team/TeamList.js';
import SearchComponent from './Team/SearchComponent.js';

const MenuTeam = () => {
  const { teams, members, newTeam, setNewTeam, initTeam, addTeam, deleteTeam, getMembers, appliedMembers, setAppliedMembers, getAppliedMembers, assignUser } = useTeam();
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
      setFilteredTeams(teams); 
    }
  }, [searchTerm, teams]);

  
  // 검색 버튼 클릭 또는 엔터키를 눌렀을 때 실행될 검색 함수
  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    // 필터링된 팀 목록으로 상태 업데이트
    setFilteredTeams(filtered);
  };
  
  const toggleOpenTeamAdd = () => {
    setOpenTeamAdd((prev) => !prev);
    if (!openTeamAdd) {
      initTeam(); // 팀 추가 다이얼로그를 열 때 초기화
    }
  };

  const toggleOpenTeam = (team) => {
    setSelectedTeam(team);
    getMembers(team.team_id)
    getAppliedMembers(team.team_id)
    setOpenTeam((prev) => !prev);
  };

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <div id="menu-team-search" autoComplete="chrome-off">
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch} />
        </div>
        <div className="menu-team-add-button" onClick={toggleOpenTeamAdd}>
          <img src={addTeamWhiteImage} />
          <span>팀 추가</span>
        </div>
      </div>
      <div id="menu-team-body">
        <div className="menu-team-list">
          <TeamList 
            teams={filteredTeams} 
            handleTeamSelect={toggleOpenTeam} 
            handleDeleteTeam={deleteTeam} />
          <TeamInfoDialog 
            open={openTeam} 
            handleClose={() => setOpenTeam(false)}
            deleteSelectedTeam={deleteTeam}
            selectedTeam={selectedTeam} 
            members={members}
            appliedMembers={appliedMembers}
            assignUser={assignUser} />
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
