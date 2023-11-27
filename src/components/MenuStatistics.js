import React, { useEffect, useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import '../css/MenuStatistics.css';

import { GraphBar } from './GraphBar';
import { networkrequest } from './Header/XHR';

function MenuStatistics() {
  const [unittime, setUnitTime] = useState("daily");
  const [unitsubject, setUnitSubjecct] = useState("individual");

  const [targetdate, setTargetDate] = useState("2023_11_16");
  const [targetmonth, setTargetMonth] = useState("2023_11_30");

  const [graphdata, setGraphData] = useState({
    status:'ok',
    data:[
      {
        nickname:'1',
        num_mission:30,
        num_success:10,
        percentage:33
      }
    ],
    isloaded:'no'
  });

  console.log(graphdata);

  const loadGraphData = () => {
    if(unittime == "daily")
    {
      networkrequest('stats/allDaily', {date:targetdate}, setGraphData);
    }
    else{
      networkrequest('stats/teamDaily', {date:targetdate}, setGraphData);
    }
    alert(unitsubject + "load: " + targetdate);
  }

  const loadGraphDataMonth = () => {
    networkrequest('stats/allMonth', {date:targetmonth}, setGraphData);
    alert(unitsubject + "load: " + targetmonth);
  }

  const targetdateChange = (new_targ) => {
    graphdata['isloaded'] = 'no';
    setTargetDate(new_targ.format("YYYY_MM_DD"));
  }

  const targetMonthChange = (new_targ) => {
    graphdata['isloaded'] = 'no';
    setTargetMonth(new_targ.format("YYYY_MM_DD"));
  }

  if(graphdata.isloaded == 'no')
  {
    if(unittime == "monthly")
    {
      loadGraphDataMonth();
    }
    else
    {
      loadGraphData();
    }
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
                  <DesktopDatePicker
                    label="--"
                    value={targetdate}
                    onChange={targetdateChange}
                    renderInput={(params) => <TextField {...params} error={false} />} />
                  {/* <DesktopDatePicker onChange={loadGraphData} /> */}
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DesktopDateTimePicker']}>
                <DemoItem>
                  <DesktopDatePicker view={'month'} views={['month', 'year']}
                    value={targetdate}
                    onChange={targetMonthChange} 
                    renderInput={(params) => <TextField {...params} error={false} />} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          }
        </div>
        <div id="ms-optionbar">
          <span style={{paddingLeft: '10px', paddingRight: '10px'}}>
            기간 :
          </span>
          <select value={unittime} onChange={(e) => {graphdata['isloaded'] = 'no'; setUnitTime(e.target.value);}}>
            <option key="daily" value={"daily"}>일별</option>
            <option key="monthly" value={"monthly"}>월별</option>
          </select>
          <span style={{padding: '10px', paddingRight: '10px'}}>
            인원 :
          </span>
          <select value={unitsubject} onChange={(e) => {graphdata['isloaded'] = 'no'; setUnitSubjecct(e.target.value);}}>
            <option key="individual" value={"individual"}>개인별</option>
            <option key="team" value={"team"}>팀별</option>
          </select>
        </div>
      </div>
      <div id="ms-lower">
        {
          graphdata.data.filter(it => it.num_mission != 0).map((it) => GraphBar(it.nickname, it.num_success, it.num_mission, it.percentage))
        }
      </div>
    </div>
  );
}

export default MenuStatistics