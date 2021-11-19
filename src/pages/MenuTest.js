import React, { Component } from 'react';
import{Grid,Container,Header,Form,Button} from 'semantic-ui-react';
import Topics from "../components/Topics.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
class MenuTest extends Component {

  constructor(props){
    super(props)
    this.state = {
      watch:'',
      Watchvalue:'',
    }
  }

  async getOtherWatch(){
    const res = await axios.get('http://localhost:5000/other/手錶數量');
    const value=res.data.value;
    this.setState({Watchvalue: value ,watch: value})
    this.handleUpdateWatch = this.handleUpdateWatch.bind(this);
  }

 
  handleChangeWatch(e){
    this.setState({Watchvalue:e.target.value})
  }
  handleUpdateWatch(e){
    axios.patch('http://localhost:5000/other/手錶數量',{
      "value" : this.state.Watchvalue
  });
  for (let i=this.state.watch;i<this.state.Watchvalue;i++) {
      axios.post('http://localhost:5000/users',{
        "watchid": 'GarminWatch'+(i+1)
      });
      console.log('新增成功')
    }
  }
  

  componentDidMount(){
      this.getOtherWatch()
  }

  

    render() {
    return(
        <Grid>
        <Grid.Row>
            <Grid.Column><Topics/></Grid.Column>
        <Grid.Column>
            <Container>
            <Header>月更記錄</Header>
            <Form>
            <Form.Input
            label="手錶數量: "
            value={this.state.Watchvalue}
            onChange={this.handleChangeWatch.bind(this)}
            />
            <Form>
                <h2>請確認以下資料</h2>
                    =======================<br/>
                    手錶編號  : {this.state.Watchvalue}<br/>
            </Form>
            <Link to="/month"><Button onClick={this.handleUpdateWatch}>新增</Button></Link>
            </Form>
            </Container>
            </Grid.Column>
            </Grid.Row>
            </Grid>
    );
  }
  
}
export default MenuTest;
