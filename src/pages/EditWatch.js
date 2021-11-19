import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
// 取得 Firebase 中的 Personal 資料表
const ref = firebase.firestore();

class EditWatch extends Component {

  constructor(props){
    super(props)
    this.state = {
      Watchsid:"",
      watchid:"",
      account:"",
      password:"",
      useraccesstoken:"",
      useraccesstokensecret:"",
    }
  }
  async getWatchById(firebaseid){
    // const res = await axios.get('http://localhost:5000/watch/'+firebaseid);

    ref.collection('Watch').doc(firebaseid).get().then(items => {
      const data = items.data();
      const watchidvalue = data.watchid;
      const accountvalue = data.account;
      const passwordvalue = data.password;
      const useraccesstokenvalue = data.userAccessToken;
      const useraccesstokensecretvalue = data.userAccessTokenSecret;
      this.setState({ Watchsid: firebaseid, watchid: watchidvalue, account: accountvalue, password: passwordvalue, useraccesstoken: useraccesstokenvalue, useraccesstokensecret: useraccesstokensecretvalue });
    });

    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAccount(e){
    this.setState({ account: e.target.value })
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangePassword(e){
    this.setState({password:e.target.value})
  }
  handleChangeUserAccessToken(e){
    this.setState({useraccesstoken:e.target.value})
  }
  handleChangeUserAccessTokenSecret(e){
    this.setState({useraccesstokensecret:e.target.value})
  }
  handleSubmit(e) {
    const today = new Date();
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+'     '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+' ';
    // axios.post('http://localhost:5000/editwatch/'+ this.state.Watchsid,{
    //   "account":this.state.account,
    //   "password":this.state.password,
    //   "userAccessToken":this.state.useraccesstoken,
    //   "userAccessTokenSecret":this.state.useraccesstokensecret,
    //   "editedTime": date
    // });
    ref.collection('Watch').doc(this.state.Watchsid).update({
      "account":this.state.account,
      "password":this.state.password,
      "userAccessToken":this.state.useraccesstoken,
      "userAccessTokenSecret":this.state.useraccesstokensecret,
      "editedTime": date
    });
    console.log('修改成功')
  }

  componentDidMount(){
    const { firebaseid } = this.props.match.params;
      this.getWatchById(firebaseid)
  }

  

  render() {
    // console.log(this.state.selectShiftOptions)
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
                <p style={h4}>手錶編號: {this.state.watchid}</p>
                <p style={h4}>帳號:</p>
                <Form.Input
                  placeholder="請輸入帳號"
                  value={this.state.account}
                  onChange={this.handleChangeAccount.bind(this)}
                />
                <p style={h4}>密碼:</p>
                <Form.Input
                  placeholder="請輸入密碼"
                  value={this.state.password}
                  onChange={this.handleChangePassword.bind(this)}
                />
                <p style={h4}>UserAccessToken:</p>
                <Form.Input
                  placeholder="請輸入 UserAccessToken"
                  value={this.state.useraccesstoken} 
                  onChange={this.handleChangeUserAccessToken.bind(this)}
                />
                <p style={h4}>UserAccessTokenSecret:</p>
                <Form.Input
                  placeholder="請輸入 UserAccessTokenSecret"
                  value={this.state.useraccesstokensecret} 
                  onChange={this.handleChangeUserAccessTokenSecret.bind(this)}
                /><br/>
                <Form style={h4}>
                  <h2>請確認以下資料</h2>
                  =======================<br/>
                  手錶編號  : {this.state.watchid}<br/>
                  帳號  : {this.state.account}<br/>
                  密碼  : {this.state.password}<br/>
                  UAT  : {this.state.useraccesstoken}<br/>
                  UAT Secret  : {this.state.useraccesstokensecret}<br/>
                </Form><br />
                <Link to="/watch"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>確認修改</Button></Link>
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  
}
export default EditWatch;
