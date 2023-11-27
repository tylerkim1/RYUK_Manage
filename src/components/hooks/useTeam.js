import { useState, useEffect } from 'react';
import { networkrequest } from '../Header/XHR';
import dayjs from 'dayjs';

const today = dayjs();

const useTeam = () => {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [appliedMembers, setAppliedMembers] = useState([]);
  const [withdrawnUsers, setWithdrawnUsers] = useState([]);
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
    fetchWithdrawUser();
  }, []);

  useEffect(() => {
    fetchMemberNums();
  }, [teams, members, withdrawnUsers]);

  const fetchMemberNums = () => {
    networkrequest('team/getNum/', {}, (data) => {
      const numbersByTeamId = data.data.reduce((acc, item) => {
        acc[item.team_id] = item.team_member_num;
        return acc;
      }, {});
      setTeamNums(numbersByTeamId);
    })
  }

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
    networkrequest('user/get/', {teamId: teamId}, (data) => {
      setMembers(data.data);
      fetchMemberNums();
    });
  }

  const getAppliedMembers = (teamId) => {
    networkrequest('team/userApplied', {}, (data) => {
      const filteredAppliedUser = data.data.filter(appliedUser => appliedUser.team_id === teamId);
      setAppliedMembers(filteredAppliedUser);
    })
  }

  const assignUser = (userId, teamId, acceptOrNot) => {
    const req = {
      userId: userId,
      teamId: teamId,
      acceptOrNot: acceptOrNot
    }
    networkrequest('user/assignTeam/', req, (data) => {
      if (data.status === "ok") alert("추가되었습니다.");
      fetchMemberNums();
    });
  }

  const fetchWithdrawUser = () => {
    networkrequest('team/userWithdrawn/', {}, (data) => {
      setWithdrawnUsers(data.data);
    })
  }
  
  const withdrawUser = (userId, teamId, acceptOrNot) => {
    const req = {
      userId: userId,
      teamId: teamId,
      acceptOrNot: acceptOrNot
    }
    networkrequest('user/eraseTeam/', req, (data) => {
      if (acceptOrNot && data.status === "ok") alert("탈퇴되었습니다.");
      fetchWithdrawUser();
      fetchMemberNums();
    });
  }

  return { teams, teamNums, members, withdrawnUsers, newTeam, setNewTeam, appliedMembers, setAppliedMembers, initTeam, addTeam, deleteTeam, getMembers, getAppliedMembers, assignUser, fetchWithdrawUser, withdrawUser };
};

export default useTeam;
