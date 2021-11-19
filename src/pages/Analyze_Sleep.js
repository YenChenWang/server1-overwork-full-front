// 數據分析 - 睡眠狀態
import React, { PureComponent } from 'react';
import{Grid,Container,Header,Form,Table} from 'semantic-ui-react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
import axios from "axios";
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
    const response = await axios.post('http://localhost:5000/sleepsanalyze', { uat });
    console.log(response.data);
    if (response.data === []) {
      alert('無資料');
    }
    this.setState({SleepData: response.data}); //將內部陣列存入外層陣列

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
