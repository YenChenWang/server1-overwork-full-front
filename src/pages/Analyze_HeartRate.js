// 數據分析 - 心率指數
import React, { PureComponent } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
// 數線圖
import { BarChart, Bar, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, } from 'recharts';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
const ref = firebase.firestore();

export default class HeartRateAnalyze extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      selectWatchOptions : [],
      watch_id: '',
      watch_watchid: '',
    }
  }

  //! 從 秒數 轉成 幾點幾分幾秒
  secondToTime(sec) {
    console.log(sec);
    // parseInt() : 只取除法中的整數
    // % : 取餘數
    const s = sec % 60;   // 秒
    const m = (parseInt(sec / 60)) % 60;   // 分
    const h = parseInt((parseInt(sec / 60)) / 60);   // 時
    return h + ':' + m + ":" + s;
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
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
    });
  }

  async getHeartRateData(uat) {
    console.log(uat);
    const dailiesAllData = [];    // 取得 Dailie 所有資料

    ref.collection('Dailie').get().then(items => {
      items.forEach(doc => {
        dailiesAllData.push(doc.data());
      });
      for (let i = 0; i < dailiesAllData.length; i++) {
        for (let j = 0; j < dailiesAllData[i].dailies.length; j++) {
          //! 判斷使用者 userAccessToken
          if (dailiesAllData[i].dailies[j].userAccessToken === uat) {
            // 將資料庫中的 日期 從字串轉成 日期 格式
            const date = new Date(dailiesAllData[i].dailies[j].calendarDate);
            const calendar = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            //! 判斷日期
            if (calendar == '2021-11-10') {
              // heartRateKey 代表 timeOffsetHeartRateSamples 中的每筆 Key
              for (let heartRateKey in dailiesAllData[i].dailies[j].timeOffsetHeartRateSamples) {
                console.log(heartRateKey);
              }
            }
          }
        }
      }
    });
  }


  handleChangeWatch(e){
    this.setState({ watch_id: e.value, watch_watchid: e.label });
    this.getHeartRateData(e.value);
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
              <Header style={h2}>心率指數</Header>
              <Container style={line}></Container>
              <Form style={margin}>
                <p style={h4}>手錶編號：</p>
                <Select options={this.state.selectWatchOptions} onChange={this.handleChangeWatch.bind(this)} /><br />
                <Header style={h2}>11月7日睡眠狀態（秒）</Header>
                  <Container style={line}></Container>
                <Form style={h4}>
                  <h2>手錶編號資料：</h2>
                  =======================<br />
                  手錶編號：{this.state.watch_watchid}<br/>
                </Form><br/>
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
