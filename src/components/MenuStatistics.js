import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../css/MenuStatistics.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GraphBar } from './GraphBar';
import { networkrequest } from './Header/XHR';
import dayjs from 'dayjs';

function MenuStatistics() {
  const [unittime, setUnitTime] = useState("daily");
  const [unitsubject, setUnitSubjecct] = useState("individual");

  const [targetdate, setTargetDate] = useState(dayjs().format("YYYY_MM_DD"));
  const [targetmonth, setTargetMonth] = useState(dayjs().format("YYYY_MM_DD"));

  const [graphdata, setGraphData] = useState({
    status: 'ok',
    data: [
      {
        nickname: '1',
        num_mission: 30,
        num_success: 10,
        percentage: 33
      }
    ],
    isloaded: 'no'
  });

  console.log(graphdata);
  useEffect(() => {
    loadGraphData();
  }, [])

  const loadGraphData = () => {
    if (unitsubject === "individual") {
      networkrequest('stats/allDaily', { date: targetdate }, setGraphData);
    }
    else {
      // alert("day team " + targetdate);
      networkrequest('stats/allTeamSumDaily', { date: targetdate }, setGraphData);
    }
  }

  const loadGraphDataMonth = () => {
    const netmonth = targetmonth.substring(0, targetmonth.length - 2) + '31';
    if (unitsubject === "individual") {
      // alert("month indiv " + netmonth);
      networkrequest('stats/allMonth', { date: netmonth }, setGraphData);
    }
    else {
      // alert("month team " + netmonth);
      networkrequest('stats/allTeamSumMonth', { date: netmonth }, setGraphData);
    }
  }

  const targetdateChange = (new_targ) => {
    graphdata['isloaded'] = 'no';
    setTargetDate(new_targ.format("YYYY_MM_DD"));
  }

  const targetMonthChange = (new_targ) => {
    console.log(new_targ);
    graphdata['isloaded'] = 'no';
    setTargetMonth(new_targ.format("YYYY_MM_DD"));
  }

  if (graphdata.isloaded === 'no') {
    console.log(targetdate);
    if (unittime === "monthly") {
      loadGraphDataMonth();
    }
    else {
      loadGraphData();
    }
  }

  return (
    <div id="menu-stat-root">
      <div id="ms-upper">
        <div id="menu-mission-header-selector">
          <FormControl className="mui-select" style={{ width: '100px' }}>
            <InputLabel className="mui-select-label" id="mui-select-team-label">팀</InputLabel>
            <Select
              labelId="mui-select-team-label"
              value={unittime}
              label="기간"
              onChange={(e) => { graphdata['isloaded'] = 'no'; setUnitTime(e.target.value); }}
            >
              <MenuItem key="daily" value={"daily"}>일별</MenuItem>
              <MenuItem key="monthly" value={"monthly"}>월별</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="mui-select" style={{ width: '100px' }}>
            <InputLabel className="mui-select-label" id="mui-select-team-label">팀</InputLabel>
            <Select
              labelId="mui-select-team-label"
              value={unitsubject}
              label="기간"
              onChange={(e) => { graphdata['isloaded'] = 'no'; setUnitSubjecct(e.target.value); }}
            >
              <MenuItem key="individual" value={"individual"}>개인별</MenuItem>
              <MenuItem key="team" value={"team"}>팀별</MenuItem>
            </Select>
          </FormControl>
        </div>
        {
          (unittime === "daily") ?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="날짜"
                value={dayjs(targetdate, "YYYY_MM_DD")}
                onChange={targetdateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                views={['month', 'year']}
                label="날짜"
                value={dayjs(targetdate, "YYYY_MM_DD")}
                onChange={targetMonthChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
      </div>
      <div id="ms-lower">
        {graphdata.data && graphdata.data.some(it => it.num_mission !== 0) ?
          graphdata.data
          .filter(it => it.num_mission !== 0)
          .sort((a, b) => b.percentage - a.percentage) // 내림차순 정렬
          .map((it) => GraphBar(it.nickname, it.num_success, it.num_mission, it.percentage))
        : "No data" 
        }
      </div>
    </div>
  );
}

export default MenuStatistics