import React, { useState } from 'react';

import '../css/MissionAdd.css';

// 사이드바 컴포넌트
function MissionAdd() {
  const [newMission, setNewMission] = useState({
    title:'',
    type:'', //매일하력 시도하력
  });

  return (
    <div className='debug' id='sidebar-main'>
      <div className='debug' >
        <input value={newMission.title} onChange={(e) => {newMission.title=(e.target.value);}} />
      </div>
      <div className='debug' >
        <input value={newMission.type} onChange={(e) => {newMission.type=(e.target.value);}} />
      </div>
      <div className='debug' >
        <button type="button" onclick="alert('Hello World!')"> 미션 추가 </button>
      </div>
    </div>
    );
}

export default MissionAdd;
