import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AssignMissionDialog = ({ open, teams, missionPool, assignMission, handleClose }) => {
    const [selectedMission, setSelectedMission] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <Dialog id="menu-mission-assign-dialog" open={open} onClose={handleClose}>
            <DialogTitle>{"미션 할당"}</DialogTitle>
            <DialogContent>
                <FormControl className="menu-mission-select" id="menu-mission-team-select">
                    <InputLabel className="menu-mission-select-label">팀 선택</InputLabel>
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
                <FormControl className="menu-mission-select" id="menu-mission-team-select">
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
            </DialogContent>
            <DialogActions>
                <div className="menu-mission-assign-button" onClick={() => { assignMission(selectedMission, selectedTeam); handleClose(); }}>
                    <span>미션 부여하기</span>
                </div>
                <Button onClick={handleClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignMissionDialog;
