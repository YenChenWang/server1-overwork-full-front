import React from "react";
import {Form,Container,Menu,Grid,Message}from "semantic-ui-react";
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import firebase from '../config/database.js';
import 'firebase/compat/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';

const Signin = () => {
    const history = useHistory();
    const[account,setAccount]=React.useState('');
    const[password,setPassword]=React.useState('');

    const h4={
        fontSize: '1.5rem',
        fontWeight: 'bold',
    }
    const h4a={
        fontSize: '1.5rem',
    }
    const buttom={
        margin:'10px',
        fontSize: '20px',
        color: 'green',
        fontWeight: 'bold',
        backgroundColor:'white',
        borderColor:'black',
    }
    function onSubmit() {
        firebase
        .auth()
        .signInWithEmailAndPassword(account,password)
        .then(()=>{
            history.replace('/personal');
        })
        .catch((error)=>{
            alert('帳號密碼錯誤!!');
        });
    }
    const ul={
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        backgroundColor: '#333',
    }
    const li={
        float: 'left',
        display: 'block',
        color: 'white',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
        fontSize: '25px',
    }
    const a={
        float: 'right',
        display: 'block',
        color: 'white',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
        fontSize: '25px',
    }

    return(
        <Grid>
            <Menu style={ul}>
                <Menu.Item as={Link} to="/" position='right' style={li}>台中榮總</Menu.Item>
                <Menu.Item as={Link} to='/' position='left' style={a}>登出</Menu.Item>
            </Menu>
        <Container>
            <Form onSubmit={onSubmit}>
                <p style={h4}>帳號</p>
                <Form.Input 
                    value={account} 
                    onChange={(e)=>setAccount(e.target.value)}
                    placeholder="請輸入帳號"
                />
                <p style={h4}>密碼</p>
                <Form.Input 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    type="password"
                />
                <Form.Button style={buttom}>登入</Form.Button>
            </Form>
            {/* <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <br/>
                    <Form.Label style={h4}>帳號</Form.Label>
                    <Form.Control value={account} onChange={(e)=>setAccount(e.target.value)} placeholder="請輸入帳號" style={h4a} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={h4}>密碼</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="請輸入密碼" style={h4a} />
                </Form.Group>
                <Button variant="primary"  type="submit">登入</Button>
            </Form> */}
        </Container>
        </Grid>
    );
}
export default Signin;
