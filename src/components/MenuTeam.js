import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import deleteImage from '../assets/delete.png';
// import addImage from '../assets/addMember.png';
import addTeamImage from '../assets/addTeam.png';

import { networkrequest}  from './Header/XHR.js';

function MenuTeam() {
  const [teams, setTeams] = useState(null);
  const [teamMembers, setTeamMembers] = useState({});
  const [newTeam, setNewTeam] = useState({
    name: '',
    startDay: '',
    endDay: '',
    link: '',
    masterId: '',
    category: '',
    introduce: '',
  });

  useEffect(() => {
    networkrequest('team/all/', {}, (data)=>setTeams(data.data));
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

  // const xhr = new XMLHttpRequest();

  // console.log(teams[0].id)

  // const addMember = (teamIndex) => {
  //   const newMember = { name: "새 팀원", age: 0, gender: "-" };
  //   const newTeams = [...teams];
  //   newTeams[teamIndex].members.push(newMember);
  //   setTeams(newTeams);
  // };

  // const deleteMember = (teamIndex, memberIndex) => {
  //   const newTeams = [...teams];
  //   newTeams[teamIndex].members.splice(memberIndex, 1);
  //   setTeams(newTeams);
  // };

  const addTeam = async () => {
    // URL 파라미터를 생성하기 위해 '-'를 '_'로 변경
    const req = { ...newTeam };
    for (let key in req) {
      req[key] = req[key].replace(/-/g, '_');
    }

    await networkrequest('team/add/', req, console.log);
    await networkrequest('team/all/', {}, (data)=>setTeams(data.data));

    // newTeam 상태 초기화
    setNewTeam({
      name: '',
      startDay: '',
      endDay: '',
      link: '',
      masterId: '',
      category: '',
      introduce: '',
    });

  };

  const handleDelete = (masterId, teamId) => {
    networkrequest('team/delete/', {callerId: masterId, teamId: teamId}, console.log);
  }

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <span className="header-text">
          현재 팀별 현황
        </span>
      </div>
      <div id="menu-team-body">
        <div id="team-list">
          {/* {console.log(teams)} */}
          {teams ? (
            teams.map((team, teamIndex) => (
              <div key={teamIndex} className="team-block">
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
                <div className="team-block-body">
                  <div className="team-member-list">
                    {teamMembers && teamMembers[team.id] ? (
                      teamMembers[team.id].map((member, memberIndex) => (
                        <div key={memberIndex} className="team-member">

                          {/* {console.log(member)} */}
                          <span className="member-info">
                            {member.user_name}
                          </span>
                          {/* <img src={deleteImage} alt="delete" className="delete-button" onClick={() => deleteMember(teamIndex, memberIndex)} /> */}
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
                {/* <img src={addImage} alt="addMember" className="team-block-add-member-image" onClick={() => addMember(teamIndex)}/> */}
              </div>
            ))) : (
            <div>Loading...</div>
          )}
          <div className="team-block team-add-block">
            <div id="team-add">
              <div class="team-add-input">
                <span>팀 이름</span>
                <input value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
              </div>
              <div class="team-add-term">
                <span>기간</span>
                <input type="date" value={newTeam.startDay} onChange={(e) => setNewTeam({ ...newTeam, startDay: e.target.value })} />
                <span>~</span>
                <input type="date" value={newTeam.endDay} onChange={(e) => setNewTeam({ ...newTeam, endDay: e.target.value })} />
              </div>
              <div class="team-add-input">
                <span>링크</span>
                <input value={newTeam.link} onChange={(e) => setNewTeam({ ...newTeam, link: e.target.value })} />
              </div>
              <div class="team-add-input">
                <span>만든 유저 ID</span>
                <input value={newTeam.masterId} onChange={(e) => setNewTeam({ ...newTeam, masterId: e.target.value })} />
              </div>
              <div class="team-add-input">
                <span>카테고리</span>
                <input value={newTeam.category} onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })} />
              </div>
              <div class="team-add-input">
                <span>소개글</span>
                <textarea value={newTeam.introduce} onChange={(e) => setNewTeam({ ...newTeam, introduce: e.target.value })} />
              </div>
              <div id="team-add-button" onClick={() => addTeam()}>
                <span>팀 만들기</span>
                <img src={addTeamImage} alt="addTeam" className="team-add-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuTeam;
