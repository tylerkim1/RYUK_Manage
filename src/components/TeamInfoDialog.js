import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const TeamInfoDialog = ({ open, handleClose, selectedTeam }) => {
  // Dialog 내부의 form elements와 로직은 여기에 포함됩니다.

  return (
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
  );
};

export default TeamInfoDialog;
