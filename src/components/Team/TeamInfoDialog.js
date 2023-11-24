import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from '@mui/material';

const TeamInfoDialog = ({ open, handleClose, handleDelete, selectedTeam, members }) => {
  const [openDelete, setOpenDelete] = useState(false);

  const deleteTeam = (master_id, team_id) => {
    handleDelete(master_id, team_id)
    setOpenDelete((prev) => !prev);
    handleClose();
  }

  const toggleOpenDeleteDialog = () => {
    setOpenDelete((prev) => !prev);
  }

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="info-dialog-title" open={open}>
        <DialogTitle id="menu-team-info-dialog-header">
          팀 멤버
          <div id="menu-team-info-dialog-delete-button" onClick={toggleOpenDeleteDialog}>
            <span>
              삭제
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          <List>
            {members ? members.map((member, index) => (
              <ListItem key={index}>
                {member.user_name}
              </ListItem>
            )) : ''}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={() => setOpenDelete(false)} open={openDelete}>
        <DialogContent>
          정말 삭제하시겠습니까?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteTeam(selectedTeam.master_id, selectedTeam.team_id)}>네</Button>
          <Button onClick={() => setOpenDelete(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamInfoDialog;
