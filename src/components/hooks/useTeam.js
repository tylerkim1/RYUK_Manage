import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';
import dayjs from 'dayjs';

const today = dayjs();

const useTeam = (isNumbers = false) => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: '',
    startDay: today,
    endDay: today.add(7, 'day'),
    link: '',
    masterId: '',
    category: '',
    introduce: '',
  });
  const [teamNums, setTeamNums] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    networkrequest('team/getNum/', {}, (data) => {
      const numbersByTeamId = data.data.reduce((acc, item) => {
        acc[item.team_id] = item.team_member_num;
        return acc;
      }, {});
      setTeamNums(numbersByTeamId);
    })
  }, [teams]);

  const fetchTeams = () => {
    networkrequest('team/all/', {}, (data) => {
      setTeams(data.data);
    });
    // console.log("debug 1")
  };

  const initTeam = () => {
    setNewTeam({
      name: '',
      startDay: today,
      endDay: today.add(7, 'day'),
      link: '',
      masterId: '',
      category: '',
      introduce: '',
    });
  }

  const addTeam = async () => {
    const req = { ...newTeam };
    for (let key in req) {
      if (key === 'startDay' || key === 'endDay') req[key] = req[key].format("YYYY_MM_DD")
    }

    networkrequest('team/add/', req, (data) => {
      if (data.status === "ok") alert("추가되었습니다.");
      fetchTeams();
    });
    initTeam();
  };

  const deleteTeam = (masterId, teamId) => {
    networkrequest('team/delete/', { callerId: masterId, teamId: teamId }, (data) => {
      if (data.status === "ok") alert("삭제되었습니다.");
      fetchTeams();
    });
  };

  const getMembers = (teamId) => {
    networkrequest('user/get/', {teamId: teamId}, (data) => setMembers(data.data));
  }


  if (isNumbers) return teamNums
  else return { teams, members, newTeam, setNewTeam, initTeam, addTeam, deleteTeam, getMembers };
};

export default useTeam;
