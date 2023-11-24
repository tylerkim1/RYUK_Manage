import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';

const useTeam = (isNumbers = false) => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: '',
    startDay: null,
    endDay: null,
    link: '',
    masterId: '',
    category: '',
    introduce: '',
  });
  const [teamNums, setTeamNums] = useState([]);

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => setTeams(data.data));
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


  const initTeam = () => {
    setNewTeam({
      name: '',
      startDay: null,
      endDay: null,
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

    networkrequest('team/add/', req, (data) => setTeams([...teams, data.data]));
    initTeam();
  };

  const deleteTeam = (masterId, teamId) => {
    networkrequest('team/delete/', { callerId: masterId, teamId: teamId }, console.log);
  };

  const getMembers = (teamId) => {
    networkrequest('user/get/', {teamId: teamId}, (data) => setMembers(data.data));
  }

  if (isNumbers) return teamNums
  else return { teams, members, newTeam, setNewTeam, initTeam, addTeam, deleteTeam, getMembers };
};

export default useTeam;
