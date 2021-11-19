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

// 修改 月更新資料
class EditMonth extends Component {

  constructor(props){
    super(props)
    this.state = {
      monthid:"",
      selectShiftOptions : [],
      shift_id: "",
      shift_name: '',
      selectWatchOptions : [],
      watch_id: '',
      watch_watchid: '',
      workhour:'',
      overhour:'',
      leave:'',
    }
  }

  // 取得 其中一筆 月更新資料
  async getMonthById(firebaseid){
    ref.collection('Month').doc(firebaseid).get().then(items => {
    const data = items.data();    // 所有資料

    const watchidvalue = data.watchid;  // 手錶資料
    const shiftvalue = data.shift;      // 輪班別
    const workhourvalue = data.workhour;    // 工作時數
    const overhourvalue = data.overhour;    // 加班天數
    const leavevalue = data.leave;          // 請假天數
    this.setState({monthid:firebaseid,watch_watchid:watchidvalue,shift_name:shiftvalue,workhour: workhourvalue ,overhour: overhourvalue,leave:leavevalue})
    })
    this.handleSubmit = this.handleSubmit.bind(this);
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
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(watchData[i]);
      }
    });
  }

  // 取得 輪班別資料
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
  handleSubmit(e) {
    const today = new Date();
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+'     '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+' ';
    ref.collection('Month').doc(this.state.monthid).update({
      "shift":this.state.shift_name,
      "workhour":this.state.workhour,
      "overhour":this.state.overhour,
      "leave":this.state.leave,
      "editedTime": date
    });
    console.log('修改成功');
  }

  componentDidMount(){
    const { firebaseid } = this.props.match.params;
      this.getWatchOptions()
      this.getShiftOptions()
      this.getMonthById(firebaseid)
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
      margin:'10px',
      fontSize: '20px',
      color: 'green',
      fontWeight: 'bold',
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
                <p style={h4}>手錶編號: {this.state.watch_watchid}</p>
                <p style={h4}>輪班班別:</p>
                <Select options={this.state.selectShiftOptions} onChange={this.handleChangeShift.bind(this)} />
                <p>You have selected <strong>{this.state.shift_name}</strong></p>
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
                <Link to="/month"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>確認修改</Button></Link>
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  
}
export default EditMonth;
