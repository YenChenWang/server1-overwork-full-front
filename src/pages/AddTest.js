import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Topics from "../components/Topics.js";
import Select from 'react-select';
import axios from 'axios';
import { Link } from 'react-router-dom';
class EditMonth extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectShiftOptions : [],
      shift_id: "",
      shift_name: '',
      selectUserOptions : [],
      user_id: '',
      user_watchid: '',
      workhour:'',
      overhour:'',
      leave:'',
    }
  }
  async getOMonthById(){
    const res = await axios.get('http://localhost:5000/months/115');
    const watchidvalue = res.data.watchid;
    const shiftvalue = res.data.shift;
    const workhourvalue = res.data.workhour;
    const overhourvalue = res.data.overhour;
    const leavevalue = res.data.leave;
    this.setState({user_watchid:watchidvalue,shift_name:shiftvalue,workhour: workhourvalue ,overhour: overhourvalue,leave:leavevalue})
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getUserOptions(){
    const res = await axios.get('http://localhost:5000/users');
    const data = res.data;
    const useroptions = data.map(User => ({
      "value" : User.id,
      "label" : User.watchid
    }))
    this.setState({selectUserOptions: useroptions})
  }

 async getShiftOptions(){
    const res = await axios.get('http://localhost:5000/shiftmenu');
    const data = res.data;
    const shiftoptions = data.map(Shiftmenu => ({
      "value" : Shiftmenu.id,
      "label" : Shiftmenu.name
    }))
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({selectShiftOptions: shiftoptions})
  }
  
  handleChangeUser(e){
   this.setState({user_id:e.value, user_watchid:e.label})
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
    axios.patch('http://localhost:5000/months/115',{
        "watchid": this.state.user_watchid,
        "shift":this.state.shift_name,
        "workhour":this.state.workhour,
        "overhour":this.state.overhour,
        "leave":this.state.leave,
    });
    console.log('修改成功')
    }

  componentDidMount(){
      this.getUserOptions()
      this.getShiftOptions()
      this.getOMonthById()
  }

  

    render() {
    console.log(this.state.selectShiftOptions)
    return(
        <Grid>
        <Grid.Row>
            <Grid.Column><Topics/></Grid.Column>
        <Grid.Column>
            <Container>
            <Header>月更記錄</Header>
            <Form>
                <p>手錶編號:</p>
                <Select options={this.state.selectUserOptions} onChange={this.handleChangeUser.bind(this)} />
                <p>You have selected <strong>{this.state.user_watchid}</strong></p>
                <p>輪班班別:</p>
                <Select options={this.state.selectShiftOptions} onChange={this.handleChangeShift.bind(this)} />
                <p>You have selected <strong>{this.state.shift_name}</strong></p>
            <Form.Input
            label="工作時數  : "
            placeholder="請輸入工作時數"
            value={this.state.workhour}
            onChange={this.handleChangeWorkhovr.bind(this)}
            />
            <Form.Input
            label="加班天數  : "
            placeholder="請輸入加班"
            value={this.state.overhour} 
            onChange={this.handleChangeOverhovr.bind(this)}
            />
            <Form.Input
            label="請假天數  : "
            placeholder="請輸入請假天數"
            value={this.state.leave} 
            onChange={this.handleChangeLeave.bind(this)}
            />
            <Form>
                <h2>請確認以下資料</h2>
                    =======================<br/>
                    手錶編號  : {this.state.user_watchid}<br/>
                    輪班班別  : {this.state.shift_name}<br/>
                    工作時數  : {this.state.workhour}<br/>
                    加班時數  : {this.state.overhour}<br/>
                    請假天數  : {this.state.leave}<br/>
            </Form>
            <Link to="/month"><Button inverted color="green" onClick={this.handleSubmit}>更改</Button></Link>
            </Form>
            </Container>
            </Grid.Column>
            </Grid.Row>
            </Grid>
    );
  }
  
}
export default EditMonth;
