import React, { PureComponent } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Headers from '../Headers.js';
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
import HeartRateAnalyze from './Analyze_HeartRate.js';
import StressAnalyze from './Analyze_Stress.js';
import SleepAnalyze from './Analyze_Sleep.js';
// import 'bootstrap/dist/css/bootstrap.min.css';


const ref = firebase.firestore();

export default class Analyze extends PureComponent {

  constructor(props){
    super(props)
    this.state = ({gender : ''})
    this.changeGender = this.changeGender.bind(this)
  }
  //宣告事件時傳入參數event取得觸發事件變數
  changeGender(event){
    //將觸發事件的DOM從event內的target屬性取出
    console.log(event.target)
    //指定選擇的選項給state.gender
    this.setState({gender:event.target.value})
  }
  componentDidUpdate(){
    console.log(`已將state.gender變動為：${this.state.gender}`)
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
    const h5={
      fontSize: '1.25rem',
    }
    const buttom={
      fontSize: '20px',
      color: 'green',
      margin: '10px',
    }

    //在render()中宣告一個text變數
    let text;
    //之後去判斷使用者選擇的是哪個
    if(this.state.gender === "heartrate")
      //用變數儲存組件
      text = <HeartRateAnalyze/>
    else if(this.state.gender === "stress")
      text = <StressAnalyze/>
    else if(this.state.gender === "sleep")
      text = <SleepAnalyze/>
    else
      text = ""

    return (
      <Grid>
        <Headers />
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Header style={h2}>數據分析</Header>
              <Container style={line}></Container><br/>
              {/*<Link to="/analyze/heartrate"><Button inverted style={buttom}>心率指數</Button></Link>
              <Link to="/analyze/stress"><Button inverted style={buttom}>壓力指數</Button></Link>
              <Link to="/analyze/sleep"><Button inverted style={buttom}>睡眠狀態</Button></Link>*/}
              {/*下拉式選單*/}
              <select onChange={this.changeGender.bind(this)} class="form-control" style={h5}>
                <option value="">請選擇...</option>
                <option value="heartrate">心率指數</option>
                <option value="stress">壓力指數</option>
                <option value="sleep">睡眠狀態</option>
              </select>
              {/*上面所設的text變數呈現在這裡*/}
              {text}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
