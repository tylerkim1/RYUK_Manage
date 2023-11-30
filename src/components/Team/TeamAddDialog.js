import React from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/DemoContainer.js';

const TeamAddDialog = ({ open, handleClose, newTeam, setNewTeam, addTeam }) => {
  // const categories = ['매일하력', '시도해력', '마음봄력', '유유자력', '레벨업력'];

  const handleStartDayChange = (newValue) => {
    setNewTeam({ ...newTeam, startDay: newValue });
  };

  const handleEndDayChange = (newValue) => {
    setNewTeam({ ...newTeam, endDay: newValue });
  };

  return (
    <Dialog id="menu-team-add-dialog" open={open} onClose={handleClose}>
            <DialogTitle>{"팀 추가"}</DialogTitle>
            <DialogContent>
              <TextField className="mui-input" label="팀 이름" placeholder="ex) 활력을 되찾자!" variant="outlined" fullWidth value={newTeam.name} onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })} />
              <TextField className="mui-input" label="링크" placeholder="카카오톡 오픈채팅 링크" variant="outlined" fullWidth value={newTeam.link} onChange={(e) => setNewTeam({ ...newTeam, link: e.target.value })} />
              <TextField className="mui-input" label="팀장" placeholder="팀장의 uid"variant="outlined" fullWidth value={newTeam.masterId} onChange={(e) => setNewTeam({ ...newTeam, masterId: e.target.value })} />
              <TextField className="mui-input" label="팀 분야" placeholder="ex) 운동, 책읽기 등" variant="outlined" fullWidth value={newTeam.category} onChange={(e) => setNewTeam({ ...newTeam, category: e.target.value })} />
              <TextField className="mui-input" label="소개글" variant="outlined" fullWidth value={newTeam.introduce} onChange={(e) => setNewTeam({ ...newTeam, introduce: e.target.value })} />

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
              <div className="menu-team-add-button" onClick={() => { addTeam(); handleClose(); }}>
                <span>팀 만들기</span>
              </div>
              <Button onClick={handleClose}>취소</Button>
            </DialogActions>
          </Dialog>
  );
};

export default TeamAddDialog;
