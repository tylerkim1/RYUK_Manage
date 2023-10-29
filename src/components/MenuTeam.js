import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import deleteImage from '../assets/delete.png';
import addImage from '../assets/addMember.png';
import addTeamImage from '../assets/addTeam.png';

function MenuTeam() {
  const [teams, setTeams] = useState(null);
  const [teamMembers, setTeamMembers] = useState({});
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamStartDate, setNewTeamStartDate] = useState('');
  const [newTeamEndDate, setNewTeamEndDate] = useState('');
  const [newTeamLink, setNewTeamLink] = useState('');
  const [newTeamUserId, setNewTeamUserId] = useState('');
  const [newTeamCategory, setNewTeamCategory] = useState('');
  const [newTeamIntroduce, setNewTeamIntroduce] = useState('');

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://13.124.69.102:5000/team/all/', true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const fetchedData = JSON.parse(xhr.responseText);
        setTeams(fetchedData.data); // 여기에서 teams도 설정
        console.log('team', fetchedData.data)
      }
    };
    xhr.withCredentials = true;
    xhr.send();

  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  // 팀 멤버 정보 불러오기
  useEffect(() => {
    if (!teams || !teams[0] || typeof teams[0].id === 'undefined') {
      return; // 아직 데이터를 불러오지 못했다면 종료
    }

    teams.forEach(team => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://13.124.69.102:5000/user/get/?Team_id=${team.id}`, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const fetchedData = JSON.parse(xhr.responseText);
          setTeamMembers(prev => ({
            ...prev,
            [team.id]: fetchedData.data,
          }));
          // console.log(fetchedData.data)
        }
      };
      xhr.withCredentials = true;
      xhr.send();
    });
  }, [teams]);

  // const xhr = new XMLHttpRequest();

  // xhr.open('GET', `http://13.124.69.102:5000/user/get/?Team_id=${teams[0].id}`, true);
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     const fetchedData = JSON.parse(xhr.responseText);
  //     // console.log('member', fetchedData.data)
  //   }
  // };

  // xhr.send();

  // console.log(teams[0].id)

  // const [teams, setTeams] = useState([
  //   {
  //     name: "팀 1",
  //     period: "2023/01/01 ~ 2023/01/01",
  //     members: [
  //       { name: "팀원 1", age: 25, gender: "남" },
  //       { name: "팀원 2", age: 22, gender: "여" },
  //       { name: "팀원 3", age: 20, gender: "남" },
  //       { name: "팀원 4", age: 21, gender: "여" },
  //     ]
  //   },
  //   {
  //     name: "팀 2",
  //     period: "2023/02/02 ~ 2023/02/02",
  //     members: [
  //       { name: "팀원 1", age: 25, gender: "남" },
  //       { name: "팀원 2", age: 22, gender: "여" },
  //     ]
  //   }
  // ]);

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

  // const addTeam = () => {
  //   const newTeam = {
  //     name: newTeamName,
  //     period: `${newTeamStartDate} ~ ${newTeamEndDate}`,
  //     members: []
  //   };
  //   setTeams([...teams, newTeam]);
  //   setNewTeamName('');
  //   setNewTeamStartDate('');
  //   setNewTeamEndDate('');
  // };


  const addTeam = () => {
    const newTeam = {
      name: newTeamName,
      start_day: newTeamStartDate,
      end_day: newTeamEndDate,
      link: newTeamLink,
      master_id: newTeamUserId,
      category: newTeamCategory,
      introduce: newTeamIntroduce,
      members: []
    };
    setTeams([...teams, newTeam]);
    // 다른 state들도 초기화
    setNewTeamName('');
    setNewTeamStartDate('');
    setNewTeamEndDate('');
    setNewTeamLink('');
    setNewTeamUserId('');
    setNewTeamCategory('');
    setNewTeamIntroduce('');

    const encodedName = encodeURIComponent(newTeamName);
    const encodedLink = encodeURIComponent(newTeamLink);
    const encodedCategory = encodeURIComponent(newTeamCategory);
    const encodedIntroduce = encodeURIComponent(newTeamIntroduce);
    const encodedUserId = encodeURIComponent(newTeamUserId);
    const encodedStartDate = encodeURIComponent(newTeamStartDate);
    const encodedEndDate = encodeURIComponent(newTeamEndDate);

    const url = `http://13.124.69.102:5000/team/add/?name=${encodedName}&link=${encodedLink}&category=${encodedCategory}&introduce=${encodedIntroduce}&master_id=${encodedUserId}&start_day=${encodedStartDate}&end_day=${encodedEndDate}`;

    const xhr = new XMLHttpRequest();
    // xhr.open('GET', `http://13.124.69.102:5000/team/add/?name=${newTeamName}&link=${newTeamLink}&category=${newTeamCategory}&introduce=${newTeamIntroduce}&master_id=${newTeamUserId}&start_day=${newTeamStartDate}&end_day=${newTeamEndDate}`, true);
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const fetchedData = JSON.parse(xhr.responseText);
        console.log('result', fetchedData.data)
      }
    };
    // xhr.withCredentials = true;

    xhr.send();
  };
  const handleChangeStartDate = (e) => {
    const originalDate = e.target.value; // 2023-10-10
    const modifiedDate = originalDate.replace(/-/g, ''); // 2023_10_10
    setNewTeamStartDate(modifiedDate);
  };
  
  const handleChangeEndDate = (e) => {
    const originalDate = e.target.value; // 2023-10-10
    const modifiedDate = originalDate.replace(/-/g, ''); // 2023_10_10
    setNewTeamEndDate(modifiedDate);
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
          {/* {console.log(teams)} */}
          {teams ? (
            teams.map((team, teamIndex) => (
              <div key={teamIndex} className="team-block">
                <div className="team-block-header">
                  <span className="team-name">
                    {team.name}
                  </span>
                  <span className="team-period">
                    기간: {team.start_day} ~ {team.end_day}
                  </span>
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
                {/* <img src={addImage} alt="addMember" className="team-block-add-member-image" onClick={() => addMember(teamIndex)} /> */}
              </div>
            ))) : (
            <div>Loading...</div>
          )}
          <div className="team-block team-add-block">
            {/* <div id="team-add">
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
            </div> */}
            <div id="team-add">
              <div class="team-add-input">
                <span>팀 이름</span>
                <input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
              </div>
              <div className="team-add-term">
                <span>기간</span>
                <input type="date" value={newTeamStartDate} onChange={handleChangeStartDate} />
                <span>~</span>
                <input type="date" value={newTeamEndDate} onChange={handleChangeEndDate} />
              </div>
              <div class="team-add-input">
                <span>링크</span>
                <input value={newTeamLink} onChange={(e) => setNewTeamLink(e.target.value)} />
              </div>
              <div class="team-add-input">
                <span>만든 유저 ID</span>
                <input value={newTeamUserId} onChange={(e) => setNewTeamUserId(e.target.value)} />
              </div>
              <div class="team-add-input">
                <span>카테고리</span>
                <input value={newTeamCategory} onChange={(e) => setNewTeamCategory(e.target.value)} />
              </div>
              <div class="team-add-input">
                <span>소개글</span>
                <textarea value={newTeamIntroduce} onChange={(e) => setNewTeamIntroduce(e.target.value)} />
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
