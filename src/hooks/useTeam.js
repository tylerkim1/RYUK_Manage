import { useState, useEffect } from 'react';
import { networkrequest } from '../path/to/Header/XHR';

const useTeam = () => {
  const [teams, setTeams] = useState([]);
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

  return { teams, initTeam, addTeam, deleteTeam };
};

export default useTeam;
