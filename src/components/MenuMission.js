import React, { useState } from 'react';
import missionImage from '../assets/sample.png';
import { Link, useLocation } from 'react-router-dom';
import '../css/MenuMission.css'

const MenuMission = (e) => {
  const id = parseInt(e.info,10);
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

  return (
    <div id="menu-mission-container">
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
      {/* <form onSubmit={handleSubmit}>
        <div className="menu-item">
          <select value={selectedMissions} onChange={(e) => setSelectedTeam(e.target.value)}>
            {missions.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div className="menu-item">
          <select value={selectedTeams} onChange={(e) => setSelectedTeam(e.target.value)}>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div className="menu-item">
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <button type="submit">미션 추가하기</button>
      </form> */}
      <Link to={'/mainpage/mission-add'}>
        <button>미션추가</button>
      </Link>
    </div>
  );
};

export default MenuMission;