// 數據分析 - 壓力指數
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

export default class StressAnalyze extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      selectWatchOptions : [],
      watch_id: '',
      watch_watchid: '',
    }
  }

  // 取得 watch 資料
  async getWatchOptions(){
    const watchData = [];
    const watchId = [];
    // 使用 get() 的方式，一次性讀取資料
    ref.collection('Watch').orderBy('createdTime').get().then(items => {
      items.forEach(doc => {
        watchId.push(doc.id);
        watchData.push(doc.data());
      });
      for (let i = 0; i < watchData.length; i++){
        watchData[i].firebaseid = watchId[i];
        const watchoptions = watchData.map(Watch => ({
          "value": Watch.id,
          "label": Watch.watchid
        }));
        this.setState({selectWatchOptions: watchoptions});
        // this.handleSubmit = this.handleSubmit.bind(this);
      }
    });
  }


  handleChangeWatch(e){
    this.setState({ watch_id: e.value, watch_watchid: e.label });
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
              <Header style={h2}>數據分析 - 壓力指數</Header>
              <Container style={line}></Container>
              <Form style={margin}>
                <p style={h4}>手錶編號：</p>
                <Select options={this.state.selectWatchOptions} onChange={this.handleChangeWatch.bind(this)} /><br />
                <Form style={h4}>
                  <h2>手錶編號資料：</h2>
                  =======================<br />
                  手錶編號：{this.state.watch_watchid}<br/>
                </Form><br/>
                <Link to="/heartrate"><Button inverted color="green" style={buttom}>確認</Button></Link>
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
