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

  const getMissions = async (date, teamId) => {
    
    // const response = await networkrequest('mission/getTeam/', {date: date, teamId: teamId},console.log);
    // const missionData = response.data;

    const missionData = [
      {
          'user_mission_id': 1, 
          'user_id': 101, 
          'mission_id': 1001, 
          'is_success': true, 
          'mission_date': "2023-04-01", 
          'from_team': true, 
          'title': "Mission One", 
          'mission_type': "매일하력", 
          'submit_type': "Online"
      },
      {
          'user_mission_id': 2, 
          'user_id': 102, 
          'mission_id': 1002, 
          'is_success': false, 
          'mission_date': "2023-04-02", 
          'from_team': false, 
          'title': "Mission Two", 
          'mission_type': "시도해력", 
          'submit_type': "Offline"
      },
      {
          'user_mission_id': 3, 
          'user_id': 103, 
          'mission_id': 1003, 
          'is_success': true, 
          'mission_date': "2023-04-03", 
          'from_team': true, 
          'title': "Mission Three", 
          'mission_type': "매일하력", 
          'submit_type': "Online"
      }
  ]
    
  // Aggregate data by mission_id
    const missionMap = {};
    missionData.forEach(item => {
      if (!missionMap[item.mission_id]) {
        missionMap[item.mission_id] = {
          mission_id: item.mission_id,
          title: item.title,
          category: item.mission_type,
          successCount: 0,
          totalCount: 0
        };
      }
      missionMap[item.mission_id].totalCount++;
      if (item.is_success) {
        missionMap[item.mission_id].successCount++;
      }
    });
    // Compute achievement rate and convert to array
    const missionsWithRate = Object.values(missionMap).map(mission => {
      const achievementRate = mission.totalCount > 0 ? `${mission.successCount} / ${mission.totalCount}` : 'N/A';
      return { ...mission, achievementRate };
    });
  
    setMissions(missionsWithRate);
  }

  const assignMission = (missionId, teamId) => {
    console.log(missionId, teamId)
    const req = {
      date: "2023_11_16",
      teamId: teamId,
      missionId: missionId
    }
    networkrequest('mission/assign_team/', req, console.log)
  }

  const addMission = (mission) => {
    console.log(mission);
    networkrequest('mission/add/', mission, (data)=>{
      alert(data.status);
    });
  }

  return { teams, missionPool, missions, getMissions, assignMission, addMission };

};

export default useMission;
