import React, { useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, List, ListItem, IconButton } from '@mui/material';
import AddMissionDialog from './AddMissionDialog';
import CloseIcon from '@mui/icons-material/Close';
import useMission from '../hooks/useMission';

const ManageMissionPool = ({ open, addMission, handleClose }) => {
  const [openAddMission, setOpenAddMission] = useState(false)
  const { missionPool, deleteMission } = useMission();
  

  const toggleAddMissionDialog = () => {
    setOpenAddMission((prev) => !prev);
  }

  const handleDeleteMission = (missionId) => {
    console.log(missionId)
    deleteMission(missionId)
  }

  return (
    <>
      <Dialog id="menu-mission-manage-mission-dialog" open={open} onClose={handleClose}>
        <DialogTitle className="menu-mission-dialog-header" id="manage">
          <span style={{ fontSize: '24px'}}>미션 풀 관리</span>
          <div id="menu-mission-add-mission-button" onClick={toggleAddMissionDialog}>
            <span>새로운 미션 추가</span>
          </div>
        </DialogTitle>
        
        <DialogContent id="menu-mission-manage-mission-dialog-body">
          <List>
            {missionPool && missionPool.map((mission) => (
              <ListItem key={mission.mission_id} value={mission.mission_id} style={{display: 'flex', justifyContent: 'space-between', borderBottom: 'solid 1px #f1f1f1'}}>
                <span>{mission.title}</span>
                <div>
                  <span style={{marginRight: '30px', fontSize: '13px'}}>{mission.mission_type}</span>
                  <IconButton onClick={() => handleDeleteMission(mission.mission_id)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
      <AddMissionDialog
        open={openAddMission}
        handleClose={toggleAddMissionDialog}
        addMission={addMission}
      />
    </>
  );
};

export default ManageMissionPool;
