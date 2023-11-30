import React, { useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const AddMissionDialog = ({ open, handleClose, addMission }) => {
  const [newMission, setNewMission] = useState({
    title: '',
    missionType: '', //매일하력 시도하력
  });
  const categories = ['매일하력', '시도해력', '마음봄력', '유유자력', '레벨업력'];

  return (
    <Dialog id="menu-mission-add-mission-dialog" open={open} onClose={handleClose}>
      <DialogTitle>{"새로운 미션 추가"}</DialogTitle>
      <DialogContent id="menu-mission-add-mission-dialog-body">
        <TextField className="mui-input" label="미션 제목" variant="outlined" fullWidth value={newMission.title} onChange={(e) => setNewMission({ ...newMission, title: e.target.value })} />
        <FormControl component="fieldset" className="mui-input">
          <FormLabel component="legend">카테고리</FormLabel>
          <RadioGroup
            row
            aria-label="category"
            name="category"
            value={newMission.missionType}
            onChange={(e) => setNewMission({ ...newMission, missionType: e.target.value })}
          >
            {categories.map((category, index) => (
              <FormControlLabel
                className='category-radio-text'
                key={index}
                value={category}
                control={<Radio />}
                label={category}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <div id="menu-mission-add-mission-button" onClick={() => { addMission(newMission); handleClose(); setNewMission({title: '', missionType: ''}); window.location.reload();}}>
          <span>미션 추가하기</span>
        </div>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMissionDialog;
