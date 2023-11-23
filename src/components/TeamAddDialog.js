import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const TeamAddDialog = ({ open, handleClose, newTeam, setNewTeam, addTeam }) => {
  // Dialog 내부의 form elements와 로직은 여기에 포함됩니다.
  const [openTeamAdd, setOpenTeamAdd] = useState(false);
  const handleClickOpenTeamAdd = () => {
    setOpenTeamAdd(true);
  };

  const handleCloseTeamAdd = () => {
    setOpenTeamAdd(false);
    initTeam();
  };

  return (
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
  );
};

export default TeamAddDialog;