import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Select from 'react-select';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Headers from '../Headers.js';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
const ref = firebase.firestore();

class AddPersonal extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectWatchOptions : [],  // 手錶 
      watch_watchid: '',          
      selectSexOptions : [],    // 性別
      sex_name: '',          
      selectAgeOptions : [],    // 年齡
      age_name: '',             // 姓名
      selectMarriageOptions : [],     // 婚姻狀況
      marriage_name: '', 
      selectChildrenOptions : [],     // 有無小孩
      children_name: '',
      selectPositionOptions : [],     // 職稱
      position_name: '',    
      selectEducationOptions : [],    // 教育程度
      education_name: '',
      selectDepartmentOptions : [],   // 部門
      department_name: '',
      selectSalaryOptions : [],       // 薪資
      salary_name: '',  

      watchid:'',
      sex:'',
      age:'',
      marriage:'',
      children:'',
      department:'',
      education:'',
      position:'',
      salary:'',
    }
  }
  //取得 手錶資料
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

  //get 性別
  async getSexOptions(){
    const data = [];
    ref.collection('SexMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const sexoptions = data.map(Sex => ({
      "value" : Sex.id,
      "label" : Sex.name
      }))
      this.setState({selectSexOptions: sexoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
    
  }

  // get 年齡
  async getAgeOptions(){ 
    const data = [];
    ref.collection('AgeMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const ageoptions = data.map(Age => ({
        "value" : Age.id,
        "label" : Age.name
      }))
      this.setState({selectAgeOptions: ageoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // get 婚姻狀況
  async getMarriageOptions(){
    const data = [];
    ref.collection('MarriageMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const marriageoptions = data.map(Marriage => ({
        "value" : Marriage.id,
        "label" : Marriage.name
      }))
      this.setState({selectMarriageOptions: marriageoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    }); 
  }

  // get 有無小孩
  async getChildrenOptions(){
    const data = [];
    ref.collection('ChildrenMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const childrenoptions = data.map(Children => ({
        "value" : Children.id,
        "label" : Children.name
      }))
      this.setState({selectChildrenOptions: childrenoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // get 職稱
  async getPositionOptions(){
    const data = [];
    ref.collection('PositionMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const positionoptions = data.map(Position => ({
        "value" : Position.id,
        "label" : Position.name
      }))
      this.setState({selectPositionOptions: positionoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // get 部門
  async getDepartmentOptions(){
    const data = [];
    ref.collection('DepartmentMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const departmentoptions = data.map(Department => ({
        "value" : Department.id,
        "label" : Department.name
      }))
      this.setState({selectDepartmentOptions: departmentoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    }); 
  }

  // get 教育程度
  async getEducationOptions(){
    const data = [];
    ref.collection('EducationMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const educationoptions = data.map(Education => ({
        "value" : Education.id,
        "label" : Education.name
      }))
      this.setState({selectEducationOptions: educationoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // get 薪資
  async getSalaryOptions(){
    const data = [];
    ref.collection('SalaryMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const salaryoptions = data.map(Salary => ({
        "value" : Salary.id,
        "label" : Salary.name
      }))
      this.setState({selectSalaryOptions: salaryoptions});
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  
  handleChangeWatch(e){
    this.setState({watch_watchid:e.label})
  }
  handleChangeSex(e){
    this.setState({sex_name:e.label})
  }
  handleChangeAge(e){
    this.setState({age_name:e.label})
  }
  handleChangeMarriage(e){
    this.setState({marriage_name:e.label})
  }
  handleChangeChildren(e){
    this.setState({children_name:e.label})
  }
  handleChangeDepartment(e){
    this.setState({department_name:e.label})
  }
  handleChangePosition(e){
    this.setState({position_name:e.label})
  }
  handleChangeEducation(e){
    this.setState({education_name:e.label})
  }
  handleChangeSalary(e){
    this.setState({salary_name:e.label})
  }
  handleSubmit(e){
    const today = new Date();
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+'     '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+' ';

    ref.collection('Personal').doc().set({
      "watchid": this.state.watch_watchid,  // 手錶
      "sex":this.state.sex_name,    // 性別
      "age":this.state.age_name,    // 年齡
      "marriage":this.state.marriage_name,    // 婚姻狀況
      "children":this.state.children_name,    // 有無小孩
      "department":this.state.department_name,   // 部門
      "education":this.state.education_name,     // 教育程度
      "position":this.state.position_name,       // 職稱
      "salary": this.state.salary_name,       // 薪資
      "firebaseid":"",             // firebase id
      "createdTime": date,        // 建檔日期
    })
    console.log("新增成功");
  }

  componentDidMount(){
      this.getWatchOptions()
      this.getSexOptions()
      this.getAgeOptions()
      this.getMarriageOptions()
      this.getChildrenOptions()
      this.getDepartmentOptions()
      this.getEducationOptions()
      this.getPositionOptions()
      this.getSalaryOptions()
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
                <Header style={h2}>基本資料</Header>
                <Container style={line}></Container>
                <Form style={margin}>
                  <p style={h4}>手錶編號:</p>
                  <Select options={this.state.selectWatchOptions} onChange={this.handleChangeWatch.bind(this)} /><br/>
                  <p style={h4}>選擇性別:</p>
                  <Select options={this.state.selectSexOptions} onChange={this.handleChangeSex.bind(this)} /><br/>
                  <p style={h4}>選擇年齡:</p>
                  <Select options={this.state.selectAgeOptions} onChange={this.handleChangeAge.bind(this)} /><br/>
                  <p style={h4}>婚姻狀態:</p>
                  <Select options={this.state.selectMarriageOptions} onChange={this.handleChangeMarriage.bind(this)} /><br/>
                  <p style={h4}>孩子有無:</p>
                  <Select options={this.state.selectChildrenOptions} onChange={this.handleChangeChildren.bind(this)} /><br/>
                  <p style={h4}>最高學歷:</p>
                  <Select options={this.state.selectEducationOptions} onChange={this.handleChangeEducation.bind(this)} /><br/>
                  <p style={h4}>所屬部門:</p>
                  <Select options={this.state.selectDepartmentOptions} onChange={this.handleChangeDepartment.bind(this)} /><br/>
                  <p style={h4}>職位名稱:</p>
                  <Select options={this.state.selectPositionOptions} onChange={this.handleChangePosition.bind(this)} /><br/>
                  <p style={h4}>薪資範圍:</p>
                  <Select options={this.state.selectSalaryOptions} onChange={this.handleChangeSalary.bind(this)} /><br/>
                
                  <Form style={h4}>
                    <h2>請確認以下資料</h2>
                    =======================<br/>
                    手錶編號  : {this.state.watch_watchid}<br/>
                    選擇性別  : {this.state.sex_name}<br/>
                    選擇年齡  : {this.state.age_name}<br/>
                    婚姻狀態  : {this.state.marriage_name}<br/>
                    孩子有無  : {this.state.children_name}<br/>
                    最高學歷  : {this.state.education_name}<br/>
                    所屬部門  : {this.state.department_name}<br/>
                    職位名稱  : {this.state.position_name}<br/>
                    薪資範圍  : {this.state.salary_name}<br/>
                  </Form><br/>
                  <Link to="/personal"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>新增</Button></Link>
                </Form>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
  
}
export default AddPersonal;
