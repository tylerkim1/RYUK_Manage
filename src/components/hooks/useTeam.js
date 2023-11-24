import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';

const useTeam = () => {
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

  useEffect(() => {
    networkrequest('team/all/', {}, (data) => setTeams(data.data));
  }, []);

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
    // URL 파라미터를 생성하기 위해 '-'를 '_'로 변경
    console.log(newTeam)
    const req = { ...newTeam };
    for (let key in req) {
      if (key === 'startDay' || key === 'endDay') req[key] = req[key].format("YYYY_MM_DD")
    }

    await networkrequest('team/add/', req, console.log);
    initTeam();
  };

  const deleteTeam = (masterId, teamId) => {
    networkrequest('team/delete/', { callerId: masterId, teamId: teamId }, console.log);
  };

  const getMembers = (teamId) => {
    networkrequest('user/get/', {teamId: teamId}, (data) => setMembers(data.data));
  }

  return { teams, members, newTeam, setNewTeam, initTeam, addTeam, deleteTeam, getMembers };
};

export default useTeam;
