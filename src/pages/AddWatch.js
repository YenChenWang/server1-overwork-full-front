import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
// 取得 Firebase 中的 Personal 資料表
const ref = firebase.firestore();

class AddWatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      watchid: 'GarminWatch',
      account: '',
      password: '',
      userAccessToken: '',
      userAccessTokenSecret: '',
      maxid: '',
    };
  }

  async getMaxWatchNum() {
    // const response = await axios.get('http://localhost:5000/maxwatchid');
    // const resMaxId = response.data[0].maxid;    // 包含了 firebaseid 與 "資料" 內容
    const watchNumData = [];
    // const watchId = [];
    // 使用 get() 的方式，一次性讀取資料
    ref.collection('MaxWatchNum').doc('MaxWatchId').get().then(items => {
      this.setState({ maxid: items.data().maxid });
    this.handleSubmit = this.handleSubmit.bind(this);
    });
    
  };
  
  
  handleChangeID(e){
    this.setState({ id: e.target.value });
    // this.handleSubmit = this.handleSubmit.bind(this);
    };
  handleChangeAccount(e){
    this.setState({ account: e.target.value });
    };
  handleChangeWatchId(e){
    this.setState({ watchid: e.target.value });
  }
  handleChangePassword(e){
    this.setState({ password: e.target.value });
  }
  handleChangeUserAccessToken(e){
    this.setState({ userAccessToken: e.target.value });
  }
  handleChangeUserAccessTokenSecret(e){
    this.setState({ userAccessTokenSecret: e.target.value });
  }


  handleSubmit(e){
    const today = new Date();
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '     ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ';
    
    // axios.post('http://localhost:5000/addwatch', {
    //   "id": this.state.id,
    //   "watchid": this.state.watchid,   // 手錶編號
    //   "account": this.state.account,    // 輪班別
    //   "password": this.state.password,   // 工作時數
    //   "userAccessToken": this.state.userAccessToken,   // 加班天數
    //   "userAccessTokenSecret": this.state.userAccessTokenSecret,    // 請假天數
    //   "firebaseid": "",
    //   "createdTime": date
    // });
    ref.collection('Watch').doc().set({
      "id": this.state.id,
      "watchid": this.state.watchid,   // 手錶編號
      "account": this.state.account,    // 輪班別
      "password": this.state.password,   // 工作時數
      "userAccessToken": this.state.userAccessToken,   // 加班天數
      "userAccessTokenSecret": this.state.userAccessTokenSecret,    // 請假天數
      "firebaseid": "",
      "createdTime": date
    });
    console.log('新增成功');
    // axios.post('http://localhost:5000/maxwatchid',{
    //   "maxid": Number(this.state.id),
    // });
    ref.collection('MaxWatchNum').doc('MaxWatchId').set({
      "maxid": Number(this.state.id)
    });
  }

  componentDidMount(){
      this.getMaxWatchNum()
  }

  render() {
    const h2 = {
      fontSize: '2rem',
      fontWeight: 'bold',
    };
    const line = {
      height: '1px',
      borderTop: 'solid gray 1px',
    };
    const margin = {
      margin: '10px',
    };
    const h4 = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    };
    const buttom = {
      fontSize: '20px',
      color: 'green',
    };
    return(
        <Grid>
          <Headers/>
          <Grid.Row>
            <Grid.Column>
              <Container>
                <Header style={h2}>手錶資料</Header>
                <Container style={line}></Container>
                <p style={h4}>目前手錶數量  :  {this.state.maxid}</p>

              <Form style={margin}>
                <p style={h4}>編號:</p>
                  <Form.Input
                    placeholder="ID"
                    value={this.state.id}
                    onChange={this.handleChangeID.bind(this)}
                  />
                  <p style={h4}>手錶編號:</p>
                  <Form.Input
                    placeholder="手錶編號"
                    value={this.state.watchid}
                    onChange={this.handleChangeWatchId.bind(this)}
                  />
                  <p style={h4}>Account:</p>
                  <Form.Input
                    placeholder="Account"
                    value={this.state.account} 
                    onChange={this.handleChangeAccount.bind(this)}
                  />
                  <p style={h4}>Password:</p>
                  <Form.Input
                    placeholder="Password"
                    value={this.state.password} 
                    onChange={this.handleChangePassword.bind(this)}
                  />
                  <p style={h4}>UserAccessToken:</p>
                  <Form.Input
                    placeholder="UserAccessToken:"
                    value={this.state.userAccessToken} 
                    onChange={this.handleChangeUserAccessToken.bind(this)}
                  />
                  <p style={h4}>UserAccessTokenSecret:</p>
                  <Form.Input
                    placeholder="UserAccessTokenSecret"
                    value={this.state.userAccessTokenSecret}  
                    onChange={this.handleChangeUserAccessTokenSecret.bind(this)}
                  />

                  <Form style={h4}>
                    <h2>請確認以下資料</h2>
                    =======================<br/>
                    編號  : {this.state.id}<br/>
                    手錶編號  : {this.state.watchid}<br/>
                    帳號  : {this.state.account}<br/>
                    密碼  : {this.state.password}<br/>
                    UAT  : {this.state.userAccessToken}<br/>
                    UAT Secret  : {this.state.userAccessTokenSecret}<br/>
                  </Form><br/>
                  <Link to="/watch"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>新增</Button></Link>
                </Form>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  };
  
};
export default AddWatch;
