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
      name:"honggild",
      mission_date:"202013201",
      num_mission:4,
      num_success:2,
      percentage:50
    },
    usrid_8501:{
      name:"emu",
      mission_date:"202013201",
      num_mission:100,
      num_success:42,
      percentage:42
    },
    usrid_8277:{
      name:"cat",
      mission_date:"202013201",
      num_mission:30,
      num_success:29,
      percentage:97
    },
    usrid_8278:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8291:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8290:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8295:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8299:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8197:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8177:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8297:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_8287:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7278:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7291:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7290:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7295:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7299:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7197:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7177:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7297:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_7287:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_6299:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_6197:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_6177:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_6297:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
    },
    usrid_6287:{
      name:"nono",
      mission_date:"202013201",
      num_mission:30,
      num_success:1,
      percentage:3
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
          Object.entries(graphdata.data).map(([usr_id,info]) => GraphBar(info.name, info.num_success, info.num_mission, info.percentage))
        }
      </div>
    </div>
  );
}

export default MenuStatistics