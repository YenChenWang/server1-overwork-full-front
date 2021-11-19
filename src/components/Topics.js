//下載semantic-ui-react套件，在終端機打上"npm install semantic-ui-react semantic-ui-css"
//使用semantic-ui-react套件裡的List
import {List} from 'semantic-ui-react';
//下載react-router-dom套件，在終端機打上"npm i react-router-dom"
//使用react-router-dom套件裡的Link
import {Link} from 'react-router-dom';
//引入用npm載下來的React
import React from 'react';

//命名一個新function叫做Topics
//這裡本來是左邊欄，後來變成放在上方欄上
function Topics(){ 
    //CSS
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

    return (
        //關於List請參考:https://react.semantic-ui.com/elements/list/
        <List style={ul}>
            <List.Item key="personal" as={Link} to="/personal" className="active" style={li}>
                基本資料
            </List.Item>
            <List.Item key="month" as={Link} to="/month" className="active" style={li}>
                出缺勤資料
            </List.Item>
            {/* <List.Item key="watch" as={Link} to="/watch" className="active" style={li}>
                手錶資料
            </List.Item> */}
            <List.Item key="analyze" as={Link} to="/analyze" className="active" style={li}>
                數據分析
            </List.Item>
        </List>
        
    );
}

//輸出Topics函式
export default Topics;
