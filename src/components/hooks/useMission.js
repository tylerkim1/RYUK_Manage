import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';
import dayjs from 'dayjs';

const useMission = () => {
  const [teams, setTeams] = useState([]);
  const [missionPool, setMissionPool] = useState([]);
  const [missions, setMissions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filteredMissions, setFilteredMissions] = useState([]);
  const categories = ['전체', '매일하력', '시도해력', '마음봄력', '유유자력', '레벨업력'];

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => setTeams(data.data));
    if (teams.length > 0) {
      setSelectedTeam(teams[0].team_id);
    }
    fetchMissionPool();
  }, []);
  
  useEffect(() => {
    if (selectedTeam) {
      getMissions(selectedDate.format("YYYY_MM_DD"), selectedTeam);
      filterMissionsByCategory(selectedCategory);
    }
  }, [selectedTeam, selectedDate, selectedCategory]);

  const fetchMissionPool = () => {
    networkrequest('mission/all/', {}, (data) => {
      setMissionPool(data.data);
    });
  };

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
    // setFilteredMissions(missionsWithRate);
  }
  
  const filterMissionsByCategory = (categoryIndex) => {
    const category = categories[categoryIndex];
    if (category === '전체') {
      setFilteredMissions(missions);
    } else {
      const filtered = missions.filter(mission => mission.category === category);
      setFilteredMissions(filtered);
    }
  };

  const assignMission = (missionId, teamId) => {
    console.log(missionId, teamId)
    const req = {
      date: "2023_11_16",
      teamId: teamId,
      missionId: missionId
    }
    networkrequest('mission/assign_team/', req, (data)=>{
      if (data.status === "ok") alert("할당되었습니다.");
    })
  }

  const addMission = (mission) => {
    console.log(mission);
    networkrequest('mission/add/', mission, (data)=>{
      if (data.status === "ok") alert("추가되었습니다.");
      fetchMissionPool();
    });
  }

  return { teams, missionPool, missions, getMissions, assignMission, addMission, selectedTeam, setSelectedTeam, categories, selectedCategory, setSelectedCategory, selectedDate, setSelectedDate, filteredMissions, filterMissionsByCategory};

};

export default useMission;
