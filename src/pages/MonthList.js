import { useState,useEffect } from "react";
import{Table,Grid,Container,Header,Button} from 'semantic-ui-react';
import axios from "axios";
import { Link } from "react-router-dom";
import Headers from '../Headers.js';
// 連接 Firebase
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
// ref 路徑連到 Month 資料庫
const ref = firebase.firestore().collection('Month');

const MonthList = () => {
    const [months, setMonths] = useState([]);
    useEffect(()=>{
        getMonths();
    }, []);
    
    // 刪除 Month 資料
    const deleteMonth = async (firebaseid) => {
        ref.doc(firebaseid).delete().then(() => {
            console.log('delete data successful');
        });
        window.setTimeout(( () => window.location.reload() ), 1300);
    }

    // 取得 Month 所有的資料
    const getMonths = async () =>{
        const monthData = [];
        const monthId = [];
        // 使用 get() 的方式，一次性讀取資料
        ref.orderBy('watchid').get().then(items => {
        items.forEach(doc => {
            monthId.push(doc.id);
            monthData.push(doc.data());
        });
        for (let i = 0; i < monthData.length; i++){
            monthData[i].firebaseid = monthId[i];
        }
        setMonths(monthData);
        });
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
    return (
        <Grid>
            <Headers/>
            <Grid.Row>
                <Grid.Column>
                    <Container>
                        <Header style={h2}>出缺勤資料</Header>
                        <Container style={line}></Container>
                        <Link to="/addmonth"><Button color="green" style={buttom}>新增</Button></Link>
                        <Header style={h2}>資料顯示</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>手錶編號</Table.HeaderCell>
                                    <Table.HeaderCell>輪班班別</Table.HeaderCell>
                                    <Table.HeaderCell>工作時數</Table.HeaderCell>
                                    <Table.HeaderCell>加班時數</Table.HeaderCell>
                                    <Table.HeaderCell>請假天數</Table.HeaderCell>
                                    <Table.HeaderCell>建檔日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改刪除</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {months.map((Month,index)=> {
                                    return(
                                        <Table.Row key={Month.firebaseid}>
                                            <Table.Cell>{index + 1}</Table.Cell>
                                            <Table.Cell>{Month.watchid}</Table.Cell>
                                            <Table.Cell>{Month.shift}</Table.Cell>
                                            <Table.Cell>{Month.workhour}</Table.Cell>
                                            <Table.Cell>{Month.overhour}</Table.Cell>
                                            <Table.Cell>{Month.leave}</Table.Cell>
                                            <Table.Cell>{Month.createdTime}</Table.Cell>
                                            <Table.Cell>{Month.editedTime}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={'/editmonth/'+Month.firebaseid}><Button>修改</Button></Link>
                                                <Button onClick={() => deleteMonth(Month.firebaseid)}>刪除</Button>
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
export default MonthList;
