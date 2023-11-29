import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ManageMissionPool from './ManageMissionPoolDialog';
import useMission from '../hooks/useMission';

const AssignMissionDialog = ({ open, teams, selectedDate, assignMission, addMission, handleClose }) => {
    const [selectedMission, setSelectedMission] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [openManageMissionPool, setOpenManageMissionPool] = useState(false)

    const { missionPool } = useMission()

    const toggleManageMissionPoolDialog = () => {
        setOpenManageMissionPool((prev) => !prev);
        handleClose();
    }

    const handleAssign = () => {
        assignMission(selectedMission, selectedTeam, selectedDate); handleClose();
        setSelectedMission(null);
        setSelectedTeam(null);
    }

    return (
        <>
            <Dialog id="menu-mission-assign-dialog" open={open} onClose={handleClose}>
                <DialogTitle className="menu-mission-dialog-header">
                    미션 할당
                    <div id="menu-mission-add-mission-button" onClick={toggleManageMissionPoolDialog}>
                        <span>미션 풀 관리</span>
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
            <ManageMissionPool
                open={openManageMissionPool}
                handleClose={toggleManageMissionPoolDialog}
                addMission={addMission}
            />
        </>
    );
};

export default AssignMissionDialog;
