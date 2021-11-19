import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Select from 'react-select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
const ref = firebase.firestore();

class AddMonth extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectShiftOptions : [],
      shift_id: "",
      shift_name: '',
      selectWatchOptions : [],
      watch_id: '',
      watch_watchid: '',

      watchid:'',
      shift:'',
      workhour:'',
      overhour:'',
      leave:'',
    }
  }

  // 取得手環資料
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
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(watchData[i]);
      }
    });
  }

  // 取得 輪班別 資料
  async getShiftOptions(){
    const data = [];
    ref.collection('ShiftMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const shiftoptions = data.map(Shiftmenu => ({
      "value" : Shiftmenu.id,
      "label" : Shiftmenu.name
    }))
    // console.log(shiftoptions);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({selectShiftOptions: shiftoptions})
    });
  }
  
  handleChangeWatch(e){
    this.setState({watch_id:e.value, watch_watchid:e.label})
  }
  handleChangeShift(e){
    this.setState({shift_id:e.value, shift_name:e.label})
  }
  handleChangeWorkhovr(e){
    this.setState({workhour:e.target.value})
  }
  handleChangeOverhovr(e){
    this.setState({overhour:e.target.value})
  }
  handleChangeLeave(e){
    this.setState({leave:e.target.value})
  }
  handleSubmit(e){
    const today = new Date();
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+'     '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+' ';
    ref.collection('Month').doc().set({
      "watchid": this.state.watch_watchid,   // 手錶編號
      "shift":this.state.shift_name,    // 輪班別
      "workhour":this.state.workhour,   // 工作時數
      "overhour":this.state.overhour,   // 加班天數
      "leave": this.state.leave,    // 請假天數
      "firebaseid":"",               // firebase id
      "createdTime": date,        // 建檔日期
    });
    console.log('新增成功');
  }

  componentDidMount(){
      this.getWatchOptions()
      this.getShiftOptions()
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
    return(
        <Grid>
          <Headers/>
          <Grid.Row>
            <Grid.Column>
              <Container>
                <Header style={h2}>月更記錄</Header>
                <Container style={line}></Container>
                <Form style={margin}>
                  <p style={h4}>手錶編號:</p>
                  <Select options={this.state.selectWatchOptions} onChange={this.handleChangeWatch.bind(this)} />
                  <p style={h4}>輪班班別:</p>
                  <Select options={this.state.selectShiftOptions} onChange={this.handleChangeShift.bind(this)} />
                  <p style={h4}>工作時數:</p>
                  <Form.Input
                    placeholder="請輸入工作時數"
                    value={this.state.workhour}
                    onChange={this.handleChangeWorkhovr.bind(this)}
                  />
                  <p style={h4}>加班天數:</p>
                  <Form.Input
                    placeholder="請輸入加班"
                    value={this.state.overhour} 
                    onChange={this.handleChangeOverhovr.bind(this)}
                  />
                  <p style={h4}>請假天數:</p>
                  <Form.Input
                    placeholder="請輸入請假天數"
                    value={this.state.leave} 
                    onChange={this.handleChangeLeave.bind(this)}
                  /><br/>
                  <Form style={h4}>
                    <h2>請確認以下資料</h2>
                    =======================<br/>
                    手錶編號  : {this.state.watch_watchid}<br/>
                    輪班班別  : {this.state.shift_name}<br/>
                    工作時數  : {this.state.workhour}<br/>
                    加班時數  : {this.state.overhour}<br/>
                    請假天數  : {this.state.leave}<br/>
                  </Form><br/>
                  <Link to="/month"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>新增</Button></Link>
                </Form>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
  
}
export default AddMonth;
