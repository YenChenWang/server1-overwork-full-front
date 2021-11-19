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

export default class EditPersonal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personalid: '',
      selectWatchOptions: [],
      watch_watchid: '',
      selectSexOptions: [],
      sex_name: '',
      selectAgeOptions: [],
      age_name: '',
      selectMarriageOptions: [],
      marriage_name: '',
      selectChildrenOptions: [],
      children_name: '',
      selectPositionOptions: [],
      position_name: '',
      selectEducationOptions: [],
      education_name: '',
      selectDepartmentOptions: [],
      department_name: '',
      selectSalaryOptions: [],
      salary_name: '',

      watchid: '',
      sex: '',
      age: '',
      marriage: '',
      children: '',
      department: '',
      education: '',
      position: '',
      salary: '',
    }
  }

  //get 單筆基本資料
  async getPersonalById(firebaseid) {
    ref.collection('Personal').doc(firebaseid).get().then(items => {
      const data = items.data();
      const watchidvalue = data.watchid;
      const agevalue = data.age;
      const sexvalue = data.sex;
      const marriagevalue = data.marriage;
      const childrenvalue = data.children;
      const educationvalue = data.education;
      const positionvalue = data.position;
      const departmentvalue = data.department;
      const salaryvalue = data.salary;
      
      this.setState({
        personalid: firebaseid,
        watch_watchid: watchidvalue,
        age_name: agevalue,
        sex_name: sexvalue,
        marriage_name: marriagevalue,
        children_name: childrenvalue,
        education_name: educationvalue,
        position_name: positionvalue,
        department_name: departmentvalue,
        salary_name: salaryvalue
      })
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //get watch
  async getWatchOptions() {
    const watchData = [];
    const watchId = [];
    // 使用 get() 的方式，一次性讀取資料
    ref.collection('Watch').orderBy('createdTime').get().then(items => {
      items.forEach(doc => {
        watchId.push(doc.id);
        watchData.push(doc.data());
      });
      for (let i = 0; i < watchData.length; i++) {
        watchData[i].firebaseid = watchId[i];
        const watchoptions = watchData.map(Watch => ({
          "value": Watch.id,
          "label": Watch.watchid
        }));
        this.setState({ selectWatchOptions: watchoptions });
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(watchData[i]);
      }
    });
  }

  //get sex
  async getSexOptions() {
    const data = [];
    ref.collection('SexMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const sexoptions = data.map(Sex => ({
        "value": Sex.id,
        "label": Sex.name
      }))
      this.setState({ selectSexOptions: sexoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 年齡
  async getAgeOptions() {
    const data = [];
    ref.collection('AgeMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const ageoptions = data.map(Age => ({
        "value": Age.id,
        "label": Age.name
      }))
      this.setState({ selectAgeOptions: ageoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 婚姻狀況
  async getMarriageOptions() {
    const data = [];
    ref.collection('MarriageMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const marriageoptions = data.map(Marriage => ({
        "value": Marriage.id,
        "label": Marriage.name
      }))
      this.setState({ selectMarriageOptions: marriageoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 有無小孩
  async getChildrenOptions() {
    const data = [];
    ref.collection('ChildrenMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const childrenoptions = data.map(Children => ({
        "value": Children.id,
        "label": Children.name
      }))
      this.setState({ selectChildrenOptions: childrenoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 職稱
  async getPositionOptions() {
    const data = [];
    ref.collection('PositionMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const positionoptions = data.map(Position => ({
        "value": Position.id,
        "label": Position.name
      }))
      this.setState({ selectPositionOptions: positionoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 部門
  async getDepartmentOptions() {
    const data = [];
    ref.collection('DepartmentMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const departmentoptions = data.map(Department => ({
        "value": Department.id,
        "label": Department.name
      }))
      this.setState({ selectDepartmentOptions: departmentoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 教育程度
  async getEducationOptions() {
    const data = [];
    ref.collection('EducationMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const educationoptions = data.map(Education => ({
        "value": Education.id,
        "label": Education.name
      }))
      this.setState({ selectEducationOptions: educationoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }

  // 薪資
  async getSalaryOptions() {
    const data = [];
    ref.collection('SalaryMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      const salaryoptions = data.map(Salary => ({
        "value": Salary.id,
        "label": Salary.name
      }))
      this.setState({ selectSalaryOptions: salaryoptions });
      this.handleSubmit = this.handleSubmit.bind(this);
    });
  }


  handleChangeWatch(e) {
    this.setState({ watch_watchid: e.label })
  }
  handleChangeSex(e) {
    this.setState({ sex_name: e.label })
  }
  handleChangeAge(e) {
    this.setState({ age_name: e.label })
  }
  handleChangeMarriage(e) {
    this.setState({ marriage_name: e.label })
  }
  handleChangeChildren(e) {
    this.setState({ children_name: e.label })
  }
  handleChangeDepartment(e) {
    this.setState({ department_name: e.label })
  }
  handleChangePosition(e) {
    this.setState({ position_name: e.label })
  }
  handleChangeEducation(e) {
    this.setState({ education_name: e.label })
  }
  handleChangeSalary(e) {
    this.setState({ salary_name: e.label })
  }
  //update personal by firebaseid
  handleSubmit(e) {
    const today = new Date();
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '     ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ';

    ref.collection('Personal').doc(this.state.personalid).update({
      "age": this.state.age_name,
      "sex": this.state.sex_name,
      "marriage": this.state.marriage_name,
      "children": this.state.children_name,
      "education": this.state.education_name,
      "position": this.state.position_name,
      "department": this.state.department_name,
      "salary": this.state.salary_name,
      "editedTime": date
    });
    console.log('修改成功')
  }


  componentDidMount() {
    const { firebaseid } = this.props.match.params;
    this.getWatchOptions()
    this.getSexOptions()
    this.getAgeOptions()
    this.getMarriageOptions()
    this.getChildrenOptions()
    this.getDepartmentOptions()
    this.getEducationOptions()
    this.getPositionOptions()
    this.getSalaryOptions()
    this.getPersonalById(firebaseid)
  }

  render() {
    //console.log(this.state.selectShiftOptions)
    const h2 = {
      fontSize: '2rem',
      fontWeight: 'bold',
    }
    const line = {
      height: '1px',
      borderTop: 'solid gray 1px',
    }
    const margin = {
      margin: '10px',
    }
    const h4 = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }
    const buttom = {
      margin: '10px',
      fontSize: '20px',
      color: 'green',
      fontWeight: 'bold',
    }
    return (
      <Grid>
        <Headers />
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Header style={h2}>基本資料</Header>
              <Container style={line}></Container>
              <Form style={margin}>
                <p style={h4}>手錶編號: {this.state.watch_watchid}</p>
                <p style={h4}>選擇性別:</p>
                <Select options={this.state.selectSexOptions} onChange={this.handleChangeSex.bind(this)} />
                <p>You have selected <strong>{this.state.sex_name}</strong> </p>
                <p style={h4}>選擇年齡:</p>
                <Select options={this.state.selectAgeOptions} onChange={this.handleChangeAge.bind(this)} />
                <p>You have selected <strong>{this.state.age_name}</strong> </p>
                <p style={h4}>婚姻狀態:</p>
                <Select options={this.state.selectMarriageOptions} onChange={this.handleChangeMarriage.bind(this)} />
                <p>You have selected <strong>{this.state.marriage_name}</strong> </p>
                <p style={h4}>孩子有無:</p>
                <Select options={this.state.selectChildrenOptions} onChange={this.handleChangeChildren.bind(this)} />
                <p>You have selected <strong>{this.state.children_name}</strong> </p>
                <p style={h4}>最高學歷:</p>
                <Select options={this.state.selectEducationOptions} onChange={this.handleChangeEducation.bind(this)} />
                <p>You have selected <strong>{this.state.education_name}</strong> </p>
                <p style={h4}>所屬部門:</p>
                <Select options={this.state.selectDepartmentOptions} onChange={this.handleChangeDepartment.bind(this)} />
                <p>You have selected <strong>{this.state.department_name}</strong> </p>
                <p style={h4}>職位名稱:</p>
                <Select options={this.state.selectPositionOptions} onChange={this.handleChangePosition.bind(this)} />
                <p>You have selected <strong>{this.state.position_name}</strong> </p>
                <p style={h4}>薪資範圍:</p>
                <Select options={this.state.selectSalaryOptions} onChange={this.handleChangeSalary.bind(this)} />
                <p>You have selected <strong>{this.state.salary_name}</strong> </p>
                
                <Form style={h4}>
                  <h2>請確認以下資料</h2>
                  =======================<br />
                  手錶編號  : {this.state.watch_watchid}<br />
                  選擇性別  : {this.state.sex_name}<br />
                  選擇年齡  : {this.state.age_name}<br />
                  婚姻狀態  : {this.state.marriage_name}<br />
                  孩子有無  : {this.state.children_name}<br />
                  最高學歷  : {this.state.education_name}<br />
                  所屬部門  : {this.state.department_name}<br />
                  職位名稱  : {this.state.position_name}<br />
                  薪資範圍  : {this.state.salary_name}<br />
                </Form><br />
                <Link to="/personal"><Button inverted color="green" onClick={this.handleSubmit} style={buttom}>確認修改</Button></Link>
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
