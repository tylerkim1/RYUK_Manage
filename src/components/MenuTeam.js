import React, { useState, useEffect } from 'react';
import '../css/MenuTeam.css';
import deleteImage from '../assets/delete.png';
// import addImage from '../assets/addMember.png';
import addTeamImage from '../assets/addTeam.png';
import addTeamWhiteImage from '../assets/addTeam_white.png'
import { TextField, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, styled, Typography, FormControl, InputLabel, Select, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { networkrequest } from './Header/XHR.js';
import { Grid } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/DemoContainer.js';
import useTeam from '../hooks/useTeam.js';

function MenuTeam() {
  // const [teams, setTeams] = useState(null);
  // const [newTeam, setNewTeam] = useState({
  //   name: '',
  //   startDay: null,
  //   endDay: null,
  //   link: '',
  //   masterId: '',
  //   category: '',
  //   introduce: '',
  // });
  const {teams, initTeam, addTeam, deleteTeam} = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [openTeamAdd, setOpenTeamAdd] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const categories = ['매일하력', '시도해력', '마음봄력', '유유자력', '레벨업력'];

  // useEffect(() => {
  //   networkrequest('team/all/', {}, (data) => setTeams(data.data));
  // }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  // const initTeam = () => {
  //   setNewTeam({
  //     name: '',
  //     startDay: null,
  //     endDay: null,
  //     link: '',
  //     masterId: '',
  //     category: '',
  //     introduce: '',
  //   });
  // }

  const handleSearch = () => {
    console.log('검색:', searchTerm);  // 검색 처리 로직
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOpenTeamAdd = () => {
    setOpenTeamAdd(true);
  };

  const handleCloseTeamAdd = () => {
    setOpenTeamAdd(false);
    initTeam();
  };

  const handleClickOpenTeam = (team) => {
    setSelectedTeam(team)
    setOpenTeam(true);
  };

  const handleCloseTeam = () => {
    setOpenTeam(false);
  };

  // const addTeam = async () => {
  //   // URL 파라미터를 생성하기 위해 '-'를 '_'로 변경
  //   console.log(newTeam)
  //   const req = { ...newTeam };
  //   for (let key in req) {
  //     if (key === 'startDay' || key === 'endDay') req[key] = req[key].format("YYYY_MM_DD")
  //   }

  //   await networkrequest('team/add/', req, console.log);
  //   initTeam();
  // };

  // const deleteTeam = (masterId, teamId) => {
  //   networkrequest('team/delete/', { callerId: masterId, teamId: teamId }, console.log);
  // }

  const handleStartDayChange = (newValue) => {
    setNewTeam({ ...newTeam, startDay: newValue });
  };

  const handleEndDayChange = (newValue) => {
    setNewTeam({ ...newTeam, endDay: newValue });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div id="menu-team-container">
      <div id="menu-team-header">
        <div id="menu-team-search">
          <TextField label="검색" autoComplete="off" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          />
        </div>
        <div className="menu-team-add-button" onClick={handleClickOpenTeamAdd}>
          <img src={addTeamWhiteImage} />
          <span>팀 추가</span>
        </div>
      </div>
      <div id="menu-team-body">
        <div className="menu-team-list">
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
                    {/* <img className="delete-button" src={deleteImage} onClick={() => deleteTeam(team.master_id, team.team_id)} /> */}
                  </Item>
                </Grid>
              ))) : (
              <Grid item>Loading...</Grid>
            )}
          </Grid>


          <Dialog onClose={handleCloseTeam} aria-labelledby="team-dialog-title" open={openTeam}>
            <DialogTitle id="menu-team-member-dialog">팀 멤버</DialogTitle>
            <DialogContent>
              <div id="menu-team-member-dialog-body">
                <span>기간: {selectedTeam?.start_day} ~ {selectedTeam?.end_day}</span>
                <span>카테고리: {selectedTeam?.category}</span>
                <span>소개: {selectedTeam?.introduce}</span>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog id="menu-team-add-dialog" open={openTeamAdd} onClose={handleCloseTeamAdd}>
            <DialogTitle>{"팀 추가"}</DialogTitle>
            <DialogContent>
              <TextField className="menu-team-add-input" label="팀 이름" variant="outlined" fullWidth value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
              <TextField className="menu-team-add-input" label="링크" variant="outlined" fullWidth value={newTeam.link}
                onChange={(e) => setNewTeam({ ...newTeam, link: e.target.value })} />
              <TextField className="menu-team-add-input" label="팀장 ID" variant="outlined" fullWidth value={newTeam.masterId}
                onChange={(e) => setNewTeam({ ...newTeam, masterId: e.target.value })} />
              {/* <TextField className="menu-team-add-input" label="카테고리" variant="outlined" fullWidth value={newTeam.category}
                onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })} /> */}

              <FormControl component="fieldset" className="menu-team-add-input">
                <FormLabel component="legend">카테고리</FormLabel>
                <RadioGroup
                  row
                  aria-label="category"
                  name="category"
                  value={newTeam.category}
                  onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })}
                >
                  {categories.map((category, index) => (
                    <FormControlLabel
                      id='menu-team-add-category-text'
                      key={index}
                      value={category}
                      control={<Radio />}
                      label={category}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <TextField className="menu-team-add-input" label="소개글" variant="outlined" fullWidth value={newTeam.introduce}
                onChange={(e) => setNewTeam({ ...newTeam, introduce: e.target.value })} />

              <div id="menu-team-add-datepicker-wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DesktopDateTimePicker']}>
                    <DemoItem >
                      <DesktopDatePicker
                        label="시작 날짜"
                        value={newTeam.startDay}
                        onChange={handleStartDayChange}
                        renderInput={(params) => <TextField {...params} error={false} />} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <span> ~ </span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DesktopDateTimePicker']}>
                    <DemoItem >
                      <DesktopDatePicker
                        label="종료 날짜"
                        value={newTeam.endDay}
                        onChange={handleEndDayChange}
                        renderInput={(params) => <TextField {...params} error={false} />} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </DialogContent>
            <DialogActions>
              <div className="menu-team-add-button" onClick={() => { addTeam(); handleCloseTeamAdd() }}>
                <span>팀 만들기</span>
              </div>
              <Button onClick={handleCloseTeamAdd}>취소</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MenuTeam;
