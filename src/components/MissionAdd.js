import React, { useState } from 'react';

import '../css/MissionAdd.css';

import { networkrequest } from './Header/XHR';

// 사이드바 컴포넌트
function MissionAdd() {
  const [newMission, setNewMission] = useState({
    title:'',
    missionType:'', //매일하력 시도하력
  });

  return (
    <div className='debug' id='msadd-main'>
      <div id='msadd-body'>
        <div className='debug' >
          미션 제목: 
          <input value={newMission.title} onChange={(e) => {setNewMission(prev=>({...prev, title:e.target.value}))}} />
        </div>
        <div className='debug' >
          미션 타입: 
          <input value={newMission.type} onChange={(e) => {setNewMission(prev=>({...prev, missionType:e.target.value}))}} />
        </div>
        <div className='debug' id='msadd-submit'>
          <div id='msadd-button'>
            <button type="button" onClick={()=>{
              console.log(newMission);
              networkrequest('mission/add/', newMission, (data)=>{
                alert(data.status);
              });
            }}> 미션 추가 </button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default MissionAdd;
