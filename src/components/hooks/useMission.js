import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';

const useMission = () => {
  const [teams, setTeams] = useState([]);
  const [missionPool, setMissionPool] = useState([]);

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => { setTeams(data.data); });
    networkrequest('mission/all/', {}, (data) => { setMissionPool(data.data); });
  }, []);

  return { teams, missionPool };
};

export default useMission;
