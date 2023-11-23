import React, { useEffect, useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../css/MenuStatistics.css';

import { GraphBar } from './GraphBar';

function MenuStatistics() {
  const [unittime, setUnitTime] = useState("daily");
  const [unitsubject, setUnitSubjecct] = useState("individual");
  const [graphdata, setGraphData] = useState({data:{
    usrid_1231:{
      mission_date:"202013201",
      num_mission:4,
      num_success:2,
      percentage:50
    },
    usrid_8501:{
      mission_date:"202013201",
      num_mission:100,
      num_success:42,
      percentage:42
    }
  }});

  const loadGraphData = () => {

  }

  if(graphdata.data == 'none')
  {
    loadGraphData();
  }

  return (
    <div id="menu-stat-root">
      <div id="ms-upper">
        <div id="ms-datebar">
          {
            (unittime == "daily") ?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DesktopDateTimePicker']}>
                <DemoItem>
                  <DesktopDatePicker onChange={loadGraphData} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DesktopDateTimePicker']}>
                <DemoItem>
                  <DesktopDatePicker view={'month'} views={['month']} onChange={loadGraphData} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          }
        </div>
        <div id="ms-optionbar">
          <span style={{paddingLeft: '10px', paddingRight: '10px'}}>
            기간 :
          </span>
          <select value={unittime} onChange={(e) => setUnitTime(e.target.value)}>
            <option key="daily" value={"daily"}>일별</option>
            <option key="monthly" value={"monthly"}>월별</option>
          </select>
          <span style={{padding: '10px', paddingRight: '10px'}}>
            인원 :
          </span>
          <select value={unitsubject} onChange={(e) => setUnitSubjecct(e.target.value)}>
            <option key="individual" value={"individual"}>개인별</option>
            <option key="team" value={"team"}>팀별</option>
          </select>
        </div>
      </div>
      <div id="ms-lower">
          {
            Object.entries(graphdata.data).map(([usr_id,info]) => GraphBar(usr_id, info.num_success, info.num_mission, info.percentage))
          }
      </div>
    </div>
  );
}

export default MenuStatistics