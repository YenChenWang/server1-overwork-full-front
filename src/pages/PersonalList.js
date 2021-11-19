import { useState,useEffect } from "react";
import{Table,Grid,Container,Header,Button} from 'semantic-ui-react';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Headers from '../Headers.js';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
// 取得 Firebase 中的 Personal 資料表
const ref = firebase.firestore().collection('Personal');

const PersonalList = () => {
    const [personals, setPersonals] = useState([]);
    useEffect(()=>{
        getPersonals();
    },[]);

    // 取得所有 基本資料
    const getPersonals = async () =>{
        const personalsData = [];
        const personalsId = [];
        
        // 使用 get() 的方式，一次性讀取資料
        ref.orderBy('createdTime').get().then(items => {
        items.forEach(doc => {
            personalsId.push(doc.id);
            personalsData.push(doc.data());
        });
        for (let i = 0; i < personalsData.length; i++){
            personalsData[i].firebaseid = personalsId[i];
            // console.log(personalsData[i]);
        }
        setPersonals(personalsData);
        });
    };

    // 刪除 單筆基本資料
    const deletePersonal = async (firebaseid) =>{
        ref.doc(firebaseid).delete().then(() => {
            console.log('delete data successful');
        });
        window.setTimeout(( () => window.location.reload() ), 1300);
    }
    
    const h2={
        fontSize: '2rem',
        fontWeight: 'bold',
    }
    const line={
        height: '1px',
        borderTop: 'solid gray 1px',
    }
    const buttom={
        margin:'10px',
        fontSize: '20px',
        color: 'green',
    }
    return(
        <Grid>
            <Headers/>
            <Grid.Row>
                <Grid.Column>
                    <Container>
                        <Header style={h2}>基本資料</Header>
                        <Container style={line}></Container>
                        <Link to="/addpersonal"><Button style={buttom}>新增</Button></Link>
                        <Header style={h2}>資料顯示</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>使用者</Table.HeaderCell>
                                    <Table.HeaderCell>性別</Table.HeaderCell>
                                    <Table.HeaderCell>年齡</Table.HeaderCell>
                                    <Table.HeaderCell>婚姻狀況</Table.HeaderCell>
                                    <Table.HeaderCell>有無小孩</Table.HeaderCell>
                                    <Table.HeaderCell>教育程度</Table.HeaderCell>
                                    <Table.HeaderCell>職稱</Table.HeaderCell>
                                    <Table.HeaderCell>部門(科別)</Table.HeaderCell>
                                    <Table.HeaderCell>薪資</Table.HeaderCell>
                                    <Table.HeaderCell>建檔日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改刪除</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {personals.map((Personal,index)=> {
                                    return(
                                        <Table.Row key={Personal.firebaseid}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{Personal.watchid}</Table.Cell>
                                            <Table.Cell>{Personal.sex}</Table.Cell>
                                            <Table.Cell>{Personal.age}</Table.Cell>
                                            <Table.Cell>{Personal.marriage}</Table.Cell>
                                            <Table.Cell>{Personal.children}</Table.Cell>
                                            <Table.Cell>{Personal.education}</Table.Cell>
                                            <Table.Cell>{Personal.department}</Table.Cell>
                                            <Table.Cell>{Personal.position}</Table.Cell>
                                            <Table.Cell>{Personal.salary}</Table.Cell>
                                            <Table.Cell>{Personal.createdTime}</Table.Cell>
                                            <Table.Cell>{Personal.editedTime}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={'/editpersonal/'+Personal.firebaseid}><Button >修改</Button></Link>
                                                <Button onClick={() => deletePersonal(Personal.firebaseid)}>刪除</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}   
                            </Table.Body>
                        </Table>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    );
}
export default PersonalList;
