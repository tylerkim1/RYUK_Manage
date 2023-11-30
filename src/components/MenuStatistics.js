import React, { useEffect, useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
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

  const [targetdate, setTargetDate] = useState(dayjs());
  const [targetmonth, setTargetMonth] = useState("2023_11_30");

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

  const loadGraphData = () => {
    if (unitsubject == "individual") {
      // alert("day indiv " + targetdate);
      networkrequest('stats/allDaily', { date: targetdate }, setGraphData);
    }
    else {
      // alert("day team " + targetdate);
      networkrequest('stats/allTeamSumDaily', { date: targetdate }, setGraphData);
    }
  }

  const loadGraphDataMonth = () => {
    const netmonth = targetmonth.substring(0, targetmonth.length - 2) + '31';
    if (unitsubject == "individual") {
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

  if (graphdata.isloaded == 'no') {
    if (unittime == "monthly") {
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
        {/* <div id="ms-datebar"> */}
        {
          (unittime == "daily") ?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="날짜"
                value={targetdate}
                onChange={targetdateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <DesktopDatePicker onChange={loadGraphData} /> */}
            </LocalizationProvider> :
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                views={['month', 'year']}
                label="날짜"
                value={targetdate}
                onChange={targetMonthChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <DesktopDatePicker onChange={loadGraphData} /> */}
            </LocalizationProvider>
          // <LocalizationProvider dateAdapter={AdapterDayjs}>
          //   <DemoContainer components={['DesktopDateTimePicker']}>
          //     <DemoItem>
          //       <DesktopDatePicker
          //         label="날짜"
          //         value={targetdate}
          //         onChange={targetdateChange}
          //         renderInput={(params) => <TextField {...params} error={false} />} />
          //       {/* <DesktopDatePicker onChange={loadGraphData} /> */}
          //     </DemoItem>
          //   </DemoContainer>
          // </LocalizationProvider>
          // :
          // <LocalizationProvider dateAdapter={AdapterDayjs}>
          //   <DemoContainer components={['DesktopDateTimePicker']}>
          //     <DemoItem>
          //       <DesktopDatePicker views={['month', 'year']}
          //         label="날짜"
          //         value={targetdate}
          //         onChange={targetMonthChange}
          //         renderInput={(params) => <TextField {...params} error={false} />} />
          //     </DemoItem>
          //   </DemoContainer>
          // </LocalizationProvider>
        }
        {/* </div> */}
      </div>
      <div id="ms-lower">
        {/* {console.log(graphdata.data)}
        { graphdata.data ? graphdata.data.filter(it => it.num_mission != 0).map((it) => GraphBar(it.nickname, it.num_success, it.num_mission, it.percentage)) : "결과가 없습니다."
        } */}
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