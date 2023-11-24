import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';
import dayjs from 'dayjs';

const useMission = () => {
  const [teams, setTeams] = useState([]);
  const [missionPool, setMissionPool] = useState([]);
  const [missions, setMissions] = useState([]);

  const today = dayjs().format("YYYY_MM_DD");

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => setTeams(data.data));
    networkrequest('mission/all/', {}, (data) => setMissionPool(data.data));
  }, []);
  
  useEffect(() => {
    if (teams.length > 0) {
      getMissions(today, teams[0].team_id);
    }
  }, [teams]); // teams 배열이 변경될 때마다 이 useEffect가 실행됩니다.

  const getMissions = (date, teamId) => {
    networkrequest('mission/getTeam/', {date: date, teamId: teamId}, (data) => setMissions(data.data))
  }

  return { teams, missionPool, missions, getMissions };
};

export default useMission;
