import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import React from 'react';
import Topics from "./components/Topics";

function Headers(){
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
        <Menu style={ul}>
            <Menu.Item style={li}>台中榮總</Menu.Item>
            <Menu.Item as={Link} to='/' style={a}>登出</Menu.Item>
            <Topics style={li}/>
        </Menu>
    );
}
export default Headers;

