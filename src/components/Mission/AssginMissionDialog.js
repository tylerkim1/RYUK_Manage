import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddMissionDialog from './AddMissionDialog';

const AssignMissionDialog = ({ open, teams, missionPool, selectedDate, assignMission, addMission, handleClose }) => {
    const [selectedMission, setSelectedMission] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [openAddMission, setOpenAddMission] = useState(false)

    const toggleAddMissionDialog = () => {
        setOpenAddMission((prev) => !prev);
    }

    const handleAssign = () => {
        assignMission(selectedMission, selectedTeam, selectedDate); handleClose();
        setSelectedMission(null);
        setSelectedTeam(null);
    }

    return (
        <>
            <Dialog id="menu-mission-assign-dialog" open={open} onClose={handleClose}>
                <DialogTitle id="menu-mission-assign-dialog-header">
                    미션 할당
                    <div id="menu-mission-add-mission-button" onClick={toggleAddMissionDialog}>
                        <span>새로운 미션 추가</span>
                    </div>
                </DialogTitle>
                <DialogContent id="menu-mission-assign-dialog-body">
                    <FormControl className="mui-select" id="mission-select">
                        <InputLabel className="menu-mission-select-label">미션 선택</InputLabel>
                        <Select
                            labelId="mission-select-label"
                            value={selectedMission}
                            label="미션 선택"
                            onChange={(e) => setSelectedMission(e.target.value)}
                        >
                            {missionPool && missionPool.map((mission) => (
                                <MenuItem key={mission.mission_id} value={mission.mission_id}>
                                    {mission.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="mui-select" id="team-select">
                        <InputLabel className="mui-select-label" id="mui-select-team-label">팀 선택</InputLabel>
                        <Select
                            labelId="team-select-label"
                            value={selectedTeam}
                            label="팀 선택"
                            onChange={(e) => setSelectedTeam(e.target.value)}
                        >
                            {teams && teams.map((team) => (
                                <MenuItem key={team.team_id} value={team.team_id}>
                                    {team.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <div className="menu-mission-assign-button" onClick={handleAssign}>
                        <span>할당</span>
                    </div>
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

export default AssignMissionDialog;
