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
    fetchMissionPool();
  }, []);
  
  useEffect(() => {
    if (teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0].team_id); // 첫 번째 팀을 선택
      getMissions(selectedDate.format("YYYY_MM_DD"), teams[0].team_id);
    }
  }, [teams]);

  useEffect(() => {
    if (selectedTeam) {
      getMissions(selectedDate.format("YYYY_MM_DD"), selectedTeam);
    }
  }, [selectedTeam, selectedDate]);

  useEffect(() => {
    filterMissionsByCategory(selectedCategory);
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 실행됩니다.

  useEffect(() => {
    filterMissionsByCategory(selectedCategory)
  }, [missions])

  const fetchMissionPool = () => {
    networkrequest('mission/all/', {}, (data) => {
      setMissionPool(data.data);
    });
  };

  const getMissions = async (date, teamId) => {
    networkrequest('mission/getTeam/', {teamId: teamId, date: date}, (data) => {
      const missionData = data.data;

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

      const missionsWithRate = Object.values(missionMap).map(mission => {
        const achievementRate = mission.totalCount > 0 ? `${mission.successCount} / ${mission.totalCount}` : 'N/A';
        return { ...mission, achievementRate };
      });
      setMissions(missionsWithRate);
      // setFilteredMissions(missionsWithRate);
    });
  }

  const filterMissionsByCategory = (categoryIndex) => {
    const category = categories[categoryIndex];
    if (category === '전체') {
      return setFilteredMissions(missions); // 전체 미션 반환
    } else {
      return setFilteredMissions(missions.filter(mission => mission.category === category)); // 특정 카테고리에 따른 미션 반환
    }
  };

  const assignMission = (missionId, teamId, date) => {
    console.log(missionId, teamId, date)
    const req = {
      date: date.format("YYYY_MM_DD"),
      teamId: teamId,
      missionId: missionId
    }
    networkrequest('mission/assign_team/', req, (data)=>{
      if (data.status === "ok") alert("할당되었습니다.");
    })
  }

  const addMission = (mission) => {
    networkrequest('mission/add/', mission, (data)=>{
      if (data.status === "ok") alert("추가되었습니다.");
      fetchMissionPool();
    });
  }

  return { teams, missionPool, missions, getMissions, assignMission, addMission, selectedTeam, setSelectedTeam, categories, selectedCategory, setSelectedCategory, selectedDate, setSelectedDate, filteredMissions, filterMissionsByCategory};

};

export default useMission;
