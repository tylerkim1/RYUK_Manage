import React from 'react';
import { Grid, Paper, styled } from '@mui/material';

const TeamList = ({ teams, handleTeamSelect }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container spacing={3}>
      {teams ? (
        teams.map((team, teamIndex) => (
          <Grid item key={teamIndex} xs={12} sm={12} md={6} lg={4} xl={3} onClick={() => handleClickOpenTeam(team)}>
            <Item>
              <div className="menu-team-block">
                <div className="menu-team-block-header">
                  <span className="menu-team-block-title">
                    {team.name}
                  </span>
                  <span>0명</span>
                </div>
                <span className="menu-team-block-desc">
                  {team.introduce}
                </span>
              </div>
              {/* <img className="delete-button" src={deleteImage} onClick={() => handleDelete(team.master_id, team.team_id)} /> */}
            </Item>
          </Grid>
        ))) : (
        <Grid item>Loading...</Grid>
      )}
    </Grid>
  );
};

export default TeamList;
