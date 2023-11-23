import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TeamInfoDialog = ({ open, handleClose, selectedTeam }) => {
  // Dialog 내부의 form elements와 로직은 여기에 포함됩니다.

  return (
    <Dialog onClose={handleClose} aria-labelledby="team-dialog-title" open={open}>
      <DialogTitle id="menu-team-member-dialog">팀 멤버</DialogTitle>
      <DialogContent>
        <div id="menu-team-member-dialog-body">
          <span>기간: {selectedTeam?.start_day} ~ {selectedTeam?.end_day}</span>
          <span>카테고리: {selectedTeam?.category}</span>
          <span>소개: {selectedTeam?.introduce}</span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamInfoDialog;
