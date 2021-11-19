// 數據分析 - 睡眠狀態
import React, { PureComponent } from 'react';
import{Grid,Container,Header,Form,Table} from 'semantic-ui-react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
// 數線圖
import { BarChart, Bar, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, } from 'recharts';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
const ref = firebase.firestore();

export default class HeartRateSleep extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      selectWatchOptions : [],
      watch_id: '',
      watch_watchid: '',
      SleepData:[] //此陣列存放完整的睡眠資料
    }
  }

  //! 從 unix timestamp 轉成 看得懂的 小時 時間
  timestampToHour(timestamp){
    const date = new Date(timestamp * 1000);
    // 幾點
    const h = date.getHours();
    return h;
  }
  //! 從 unix timestamp 轉成 看得懂的 分鐘 時間
  timestampToMinutes(timestamp){
    const date = new Date(timestamp * 1000);
    // 幾分
    const m = date.getMinutes();
    return m
  }

  //! 從 unix timestamp 轉成 看得懂的時間
  timestampToTime(timestamp){
    const date = new Date(timestamp * 1000);
    // 幾點
    const h = date.getHours();
    // 幾分
    const m = date.getMinutes();
    const time = date.getHours() + ':' + date.getMinutes();
    // 看時間 1~23 點
    for (let j = 1; j <= 23; j++){
      // 如果 h 有在 1 ~ 24 點內
      if (h >= j && h < j + 1) {
        // 如果 h 是 1 點 ~ 9 點
        if (h >= 1 && h < 10) {
          // 如果 m 是 0 分 ~ 9 分
          if (m >= 0 && m < 10) {
            return ('0' + h + ':0' + m);
          }
          else {
            return ('0' + h + ':' + m);
          }
        }
        // 如果 h 是 10 點 ~ 23 點
        else if (h >= 10 && h < 23) {
          // 如果 m 是 0 分 ~ 9 分
          if (m >= 0 && m < 10) {
            return (h + ':0' + m);
          }
          else {
            return (h + ':' + m);
          }
        } 
      }
    }
  }

  //! 在存資料進 array 時，如果 array 中有資料了就不要存入 array
  // array 是陣列，arg 是資料，判斷 arg 是否已存在於 array 中，如果已存在就不儲存
  // arg 只能是數字或文字
  pushNoRepeat(array, arg) {
    for (let i = 0; i <= array.length; i++){
      if (array.indexOf(arg) == -1) {
        array.push(arg);
        return 'T';
      }
      else {
        return 'F';
      }
    }
  }

  // 取得 watch 資料
  async getWatchOptions(){
    const watchData = [];
    const watchId = [];
    // 使用 get() 的方式，一次性讀取資料
    ref.collection('Watch').orderBy('id').get().then(items => {
      items.forEach(doc => {
        watchId.push(doc.id);
        watchData.push(doc.data());
      });
      for (let i = 0; i < watchData.length; i++){
        watchData[i].firebaseid = watchId[i];
        const watchoptions = watchData.map(Watch => ({
          "value": Watch.userAccessToken,
          "label": Watch.watchid
        }));
        this.setState({selectWatchOptions: watchoptions});
      }
    });
  }

  // 取得 Sleeps 的所有資料，uat = userAccessToken
  async getSleepsOptions(uat) {
    console.log(uat);
    const sleepsAllData = [];    // 所有的睡眠資料
    const sleepsFinalData = [];    // 最終儲存已排序且整理過的睡眠資料
    // awake
    const sleepsAwakeData = [];   // 清醒的資料，資料未排序
    const startTimeAwakeArray = [];   // 清醒的時段中的開始時間，unix 格式
    // rem
    const sleepsRemData = [];   // 快速動眼期的資料，資料未排序
    const startTimeRemArray = [];   // 快速動眼期的時段中的開始時間，unix 格式
    // light
    const sleepsLightData = [];   // 淺層睡眠的資料，資料未排序
    const startTimeLightArray = [];   // 淺層睡眠的時段中的開始時間，unix 格式
    // deep
    const sleepsDeepData = [];   // 深層睡眠的資料，資料未排序
    const startTimeDeepArray = [];   // 深層睡眠的時段中的開始時間，unix 格式

    // 從 firebase 中抓取 Sleeps 資料表中的資料，並存入 sleepsAllData 的陣列中
    ref.collection('Sleeps').get().then(items => {
      items.forEach(doc => {
        sleepsAllData.push(doc.data());
      });
      for (let j = 0; j < sleepsAllData.length; j++) {
        for (let i = 0; i < sleepsAllData[j].sleeps.length; i++) {
          //! 判斷使用者 userAccessToken
          if (sleepsAllData[j].sleeps[i].userAccessToken === uat) {
            // 將資料庫中的 日期 從字串轉成 日期 格式
            const date = new Date(sleepsAllData[j].sleeps[i].calendarDate);
            const calendar = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            //! 判斷日期
            if (calendar == '2021-11-10') {
              // console.log(sleepsAllData[j].sleeps[i].durationInSeconds);
              //! 判斷在 sleepLevelsMap 中有無 awake(清醒) 這個欄位，如果有就進入
              if (sleepsAllData[j].sleeps[i].sleepLevelsMap.hasOwnProperty('awake')) {
                for (let z = 0; z < sleepsAllData[j].sleeps[i].sleepLevelsMap.awake.length; z++){
                  // 判斷 awake 中 startTime 的 unixTime 是否已存入 startTimeAwakeArray 中，運用 pushNoRepeat function 判斷如果 startTimeAwakeArray 中已經有同樣的 unixTime，則不存入資料
                  if (this.pushNoRepeat(startTimeAwakeArray, sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].startTimeInSeconds) == 'T') {
                    // 將 unixTime 轉成看得懂的時間
                    const time = this.timestampToTime(sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].startTimeInSeconds);
                    const hour = this.timestampToHour(sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].startTimeInSeconds);
                    const minutes = this.timestampToMinutes(sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].startTimeInSeconds);
                    // 將資料存入 sleepsAwakeData 這個 array 中
                    sleepsAwakeData.push({
                      id: 4, 
                      sleepType: '清醒', 
                      startTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].startTimeInSeconds,
                      endTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.awake[z].endTimeInSeconds, Time: time,
                      Hour: hour, 
                      Minutes: minutes,
                      awakeDurationTime: sleepsAllData[j].sleeps[i].awakeDurationInSeconds
                    });
                  }
                }
              }

              //! 判斷在 sleepLevelsMap 中有無 rem(快速動眼期) 這個欄位，如果有就進入
              if (sleepsAllData[j].sleeps[i].sleepLevelsMap.hasOwnProperty('rem')){
                for (let z = 0; z < sleepsAllData[j].sleeps[i].sleepLevelsMap.rem.length; z++){
                  // 判斷 rem 中 startTime 的 unixTime 是否已存入 startTimeAwakeArray 中，運用 pushNoRepeat function 判斷如果 startTimeAwakeArray 中已經有同樣的 unixTime，則不存入資料
                  if (this.pushNoRepeat(startTimeRemArray, sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].startTimeInSeconds) == 'T'){
                    // 將 unixTime 轉成看得懂的時間
                    const time = this.timestampToTime(sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].startTimeInSeconds);
                    const hour = this.timestampToHour(sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].startTimeInSeconds);
                    const minutes = this.timestampToMinutes(sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].startTimeInSeconds);
                    // 將資料存入 sleepsRemData 這個 array 中
                    sleepsRemData.push({
                      id: 3, 
                      sleepType: 'REM', 
                      startTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].startTimeInSeconds,
                      endTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.rem[z].endTimeInSeconds, 
                      Time: time,
                      Hour: hour, 
                      Minutes: minutes,
                      remDurationTime: sleepsAllData[j].sleeps[i].remSleepInSeconds
                    });
                  }
                }
              }

              //! 判斷在 sleepLevelsMap 中有無 light(淺層睡眠) 這個欄位，如果有就進入
              if (sleepsAllData[j].sleeps[i].sleepLevelsMap.hasOwnProperty('light')){
                for (let z = 0; z < sleepsAllData[j].sleeps[i].sleepLevelsMap.light.length; z++){
                  if (this.pushNoRepeat(startTimeLightArray, sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].startTimeInSeconds) == 'T'){
                    // 將 unixTime 轉成看得懂的時間
                    const time = this.timestampToTime(sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].startTimeInSeconds);
                    const hour = this.timestampToHour(sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].startTimeInSeconds);
                    const minutes = this.timestampToMinutes(sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].startTimeInSeconds);
                    // 將資料存入 sleepsLightData 這個 array 中
                    sleepsLightData.push({
                      id: 2, 
                      sleepType: '淺層', 
                      startTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].startTimeInSeconds,
                      endTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.light[z].endTimeInSeconds, 
                      Time: time,
                      Hour: hour, 
                      Minutes: minutes,
                      lightDurationTime: sleepsAllData[j].sleeps[i].lightSleepDurationInSeconds
                    });
                  }
                }
              }

              //! 判斷在 sleepLevelsMap 中有無 deep(深層睡眠) 這個欄位，如果有就進入
              if (sleepsAllData[j].sleeps[i].sleepLevelsMap.hasOwnProperty('deep')){
                for (let z = 0; z < sleepsAllData[j].sleeps[i].sleepLevelsMap.deep.length; z++){
                  if (this.pushNoRepeat(startTimeDeepArray, sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].startTimeInSeconds) == 'T'){
                    // 將 unixTime 轉成看得懂的時間
                    const time = this.timestampToTime(sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].startTimeInSeconds);
                    const hour = this.timestampToHour(sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].startTimeInSeconds);
                    const minutes = this.timestampToMinutes(sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].startTimeInSeconds);
                    // 將資料存入 sleepsDeepData 這個 array 中
                    sleepsDeepData.push({
                      id: 1, 
                      sleepType: '深層', 
                      startTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].startTimeInSeconds,
                      endTimeUnix: sleepsAllData[j].sleeps[i].sleepLevelsMap.deep[z].endTimeInSeconds, 
                      Time: time,
                      Hour: hour, 
                      Minutes: minutes,
                      deepDurationTime: sleepsAllData[j].sleeps[i].deepSleepDurationInSeconds
                    });
                  }
                }
              }
            }
            
          }
        }
      }
      //! 將資料依照時間做排序後存入 sleepsFinalData
      for (let h = 1; h < 24; h++){
        for (let m = 0; m < 60; m++){
          // awake
          for (let i = 0; i < sleepsAwakeData.length; i++){
            if (sleepsAwakeData[i].Hour === h && sleepsAwakeData[i].Minutes === m) {
              sleepsFinalData.push(sleepsAwakeData[i]);
            }
          }
          // rem
          for(let i = 0; i < sleepsRemData.length; i++){
            if (sleepsRemData[i].Hour === h && sleepsRemData[i].Minutes === m) {
              sleepsFinalData.push(sleepsRemData[i]);
            }
          }
          // light
          for(let i = 0; i < sleepsLightData.length; i++){
            if (sleepsLightData[i].Hour === h && sleepsLightData[i].Minutes === m) {
              sleepsFinalData.push(sleepsLightData[i]);
            }
          }
          // deep
          for(let i = 0; i < sleepsDeepData.length; i++){
            if (sleepsDeepData[i].Hour === h && sleepsDeepData[i].Minutes === m) {
              sleepsFinalData.push(sleepsDeepData[i]);
            }
          }
        }
      }
      this.setState({SleepData: sleepsFinalData}); //將內部陣列存入外層陣列
      console.log(this.state.SleepData);
    }); 
  }


  handleChangeWatch(e) {
    this.setState({ watch_UAT: e.value, watch_watchid: e.label });
    this.getSleepsOptions(e.value);
  }

  componentDidMount(){
    this.getWatchOptions();
  }

  render() {
    const h2={
      fontSize: '2rem',
      fontWeight: 'bold',
    }
    const line={
      height: '1px',
      borderTop: 'solid gray 1px',
    }
    const margin={
      margin: '10px',
    }
    const h4={
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }
    const buttom={
      fontSize: '20px',
      color:'green',
    }
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Header style={h2}>睡眠狀態</Header>
              <Container style={line}></Container>
              <Form style={margin}>
                <p style={h4}>手錶編號：</p>
                <Select options={this.state.selectWatchOptions} 
                        onChange={this.handleChangeWatch.bind(this)} />
                <br />
                <Header style={h2}>11月7日睡眠狀態（秒）</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width='100%' height={200}>
                    <BarChart
                      width={500}
                      height={300}
                      data={this.state.SleepData}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="category" dataKey="Time"/>
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="id" fill="#82ca9d" minPointSize={5}>
                        <LabelList dataKey="sleepType" label={{ position: 'top' }}  />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
              </Form>
              <Header style={h2}>資料顯示</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>NO</Table.HeaderCell>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>SlEEPTYPE</Table.HeaderCell>
                                    <Table.HeaderCell>Time</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.SleepData.map((Sleep,index)=> {
                                    return(
                                        <Table.Row>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{Sleep.id}</Table.Cell>
                                            <Table.Cell>{Sleep.sleepType}</Table.Cell>
                                            <Table.Cell>{Sleep.Time}</Table.Cell>
                                        </Table.Row>
                                    );
                                })}   
                            </Table.Body>
                        </Table>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
