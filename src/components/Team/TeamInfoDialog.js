import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from '@mui/material';

const TeamInfoDialog = ({ open, handleClose, deleteSelectedTeam, selectedTeam, members, appliedMembers, assignUser }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openApplyConfirm, setOpenApplyConfirm] = useState(false);
  const [apply, setApply] = useState({
    user_id: 0,
    isAccept: 0
  });

  const handleApply = () => {
    assignUser(apply.user_id, selectedTeam.team_id, apply.isAccept)
    setOpenApplyConfirm((prev) => !prev)
    handleClose();
  }

  const handleDelete = () => {
    deleteSelectedTeam(selectedTeam.master_id, selectedTeam.team_id)
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
                {member.nickname}
              </ListItem>
            )) : ''}
          </List>
          <List>
            {appliedMembers
              .map((appliedMember, index) => (
                <ListItem key={index} id="menu-team-info-dialog-applied-member">
                  {appliedMember.nickname}
                  <div id="menu-team-info-dialog-applied-buttons-wrapper">
                    <div id="menu-team-info-dialog-applied-accept-button" onClick={() => {
                      setApply({user_id: appliedMember.user_id, isAccept: 1})
                      setOpenApplyConfirm(true)  
                    }}>
                      <span>수락</span>
                    </div>
                    <div id="menu-team-info-dialog-applied-decline-button" onClick={() => {
                      setApply({user_id: appliedMember.user_id, isAccept: 0})
                      setOpenApplyConfirm(true)  
                    }}>
                      <span>거절</span>
                    </div>
                  </div>
                </ListItem>
              ))
            }
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
          <Button onClick={handleDelete}>네</Button>
          <Button onClick={() => setOpenDelete(false)}>취소</Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={() => setOpenApplyConfirm(false)} open={openApplyConfirm}>
        <DialogContent>
          팀 참여를 {apply.isAccept ? "수락" : "거절"} 하시겠습니까?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply}>네</Button>
          <Button onClick={() => setOpenApplyConfirm(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TeamInfoDialog;
