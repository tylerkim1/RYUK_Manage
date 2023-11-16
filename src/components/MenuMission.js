import React, { useState } from 'react';
import missionImage from '../assets/sample.png';
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

  const missions2 = [
    {
      title: '미션 2',
      achieveLevel: '3/3',
      participants: [
        { name: '쿵짝님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵쿵님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵야님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' }
      ]
    },
    {
      title: '미션 3',
      achieveLevel: '2/3',
      participants: [
        { name: '쿵짝님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵쿵님', image: missionImage, desc: '오늘 과일을 썰어 먹었어요!' },
        { name: '쿵야님', image: null, desc: '아직 미션을 완료하지 못했어요.' }
      ]
    }
  ];
  
  let missions;
  if(id === 1) missions = missions1;
  else missions=missions2;

  const [newMission, setNewMission] = useState({
    title: '',
    date: '',
    group: '',
    type: [],
    form: '',
    inCharge: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox') {
      setNewMission({
        ...newMission,
        [name]: newMission[type].includes(value)
          ? newMission[type].filter((t) => t !== value)
          : [...newMission[type], value],
      });
    } else {
      setNewMission({ ...newMission, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 newMission을 이용하여 무언가를 할 수 있습니다.
    // 예를 들면 서버에 데이터를 보내거나 상태를 업데이트하는 것 등입니다.
    console.log(newMission);
  };

  return (
    <div id="menu-mission-container">
      <div id="menu-mission-body">
        <div id="common-mission-list">
          {missions.map((mission, missionIndex) => (
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
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            name="title"
            value={newMission.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          날짜:
          <input
            type="date"
            name="date"
            value={newMission.date}
            onChange={handleInputChange}
          />
        </label>
        {/* 그룹, 타입, 형태 등의 다른 필드들도 비슷한 방식으로 추가하실 수 있습니다. */}
        <button type="submit">미션 추가하기</button>
      </form>
    </div>
  );
};

export default MenuMission;