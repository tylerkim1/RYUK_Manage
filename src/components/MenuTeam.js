import React, { useState } from 'react';
import '../css/MenuTeam.css';
import deleteImage from '../assets/delete.png';
import addImage from '../assets/addMember.png';
import addTeamImage from '../assets/addTeam.png';

function MenuTeam() {
  const [teams, setTeams] = useState([
    {
      name: "팀 1",
      period: "2023/01/01 ~ 2023/01/01",
      members: [
        { name: "팀원 1", age: 25, gender: "남" },
        { name: "팀원 2", age: 22, gender: "여" },
        { name: "팀원 3", age: 20, gender: "남" },
        { name: "팀원 4", age: 21, gender: "여" },
      ]
    },
    {
      name: "팀 2",
      period: "2023/02/02 ~ 2023/02/02",
      members: [
        { name: "팀원 1", age: 25, gender: "남" },
        { name: "팀원 2", age: 22, gender: "여" },
      ]
    }
  ]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamStartDate, setNewTeamStartDate] = useState('');
  const [newTeamEndDate, setNewTeamEndDate] = useState('');

  const addMember = (teamIndex) => {
    const newMember = { name: "새 팀원", age: 0, gender: "-" };
    const newTeams = [...teams];
    newTeams[teamIndex].members.push(newMember);
    setTeams(newTeams);
  };

  const deleteMember = (teamIndex, memberIndex) => {
    const newTeams = [...teams];
    newTeams[teamIndex].members.splice(memberIndex, 1);
    setTeams(newTeams);
  };

  const addTeam = () => {
    const newTeam = {
      name: newTeamName,
      period: `${newTeamStartDate} ~ ${newTeamEndDate}`,
      members: []
    };
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    setNewTeamStartDate('');
    setNewTeamEndDate('');
  };

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <span className="header-text">
          현재 팀별 현황
        </span>
      </div>
      <div id="menu-team-body">
        <div id="team-list">
          {teams.map((team, teamIndex) => (
            <div key={teamIndex} className="team-block">
              <div className="team-block-header">
                <span className="team-name">
                  {team.name}
                </span>
                <span className="team-period">
                  기간: {team.period}
                </span>
              </div>
              <div className="team-block-body">
                <div className="team-member-list">
                  {team.members.map((member, memberIndex) => (
                    <div key={memberIndex} className="team-member">
                      <span className="member-info">
                        {member.name} ({member.age}/{member.gender})
                      </span>
                      <img src={deleteImage} alt="delete" className="delete-button" onClick={() => deleteMember(teamIndex, memberIndex)} />
                    </div>
                  ))}
                </div>
              </div>
              <img src={addImage} alt="addMember" className="team-block-add-member-image" onClick={() => addMember(teamIndex)} />
            </div>
          ))}
          <div className="team-block team-add-block">
            <div id="team-add">
              <div id="team-add-name">
                <span>팀 이름</span>
                <input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
              </div>
              <div id="team-add-term">
                <span>기간</span>
                <input type="date" value={newTeamStartDate} onChange={(e) => setNewTeamStartDate(e.target.value)} />
                <span>~</span>
                <input type="date" value={newTeamEndDate} onChange={(e) => setNewTeamEndDate(e.target.value)} />
              </div>
              <div id="team-add-button" onClick={() => addTeam()}>
                <span>팀 만들기</span>
                <img src={addTeamImage} alt="addTeam" className="team-add-image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuTeam;
