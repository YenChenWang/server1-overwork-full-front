import { useState,useEffect } from "react";
import{Table,Grid,Container,Header,Button} from 'semantic-ui-react';
import axios from "axios";
import { Link } from "react-router-dom";
import firebase from '../config/database.js';
import 'firebase/compat/firestore';
import Headers from '../Headers.js';
// 取得 Firebase 中的 Personal 資料表
const ref = firebase.firestore().collection('Watch');
const WatchList = () => {
    const [watch, setWatch] = useState([]);
    useEffect(()=>{
        getWatch();
    }, []);
    
    const deleteWatch = async (firebaseid) => {
        ref.doc(firebaseid).delete().then(() => {
            console.log('delete ',firebaseid,' successful');
        });
        window.setTimeout(( () => window.location.reload() ), 1300);
    }
    const getWatch = async () =>{
        // const response = await axios.get('http://localhost:5000/watch');
        // const resData = response.data;    // 包含了 firebaseid 與 "資料" 內容
        // setWatch(resData);
        const watchData = [];
        const watchId = [];
        // 使用 get() 的方式，一次性讀取資料
        ref.orderBy('watchid').get().then(items => {
        items.forEach(doc => {
            watchId.push(doc.id);
            watchData.push(doc.data());
        });
        for (let i = 0; i < watchData.length; i++){
            watchData[i].firebaseid = watchId[i];
            // console.log(watchData[i]);
        }
        setWatch(watchData);
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
    }
    return (
        <Grid>
            <Headers/>
            <Grid.Row>
                <Grid.Column>
                    <Container>
                        <Header style={h2}>Garmin Watch 手錶</Header>
                        <Container style={line}></Container>
                        <Link to="/addwatch"><Button color="green" style={buttom}>新增</Button></Link>
                        <Header style={h2}>資料顯示</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>No.</Table.HeaderCell>
                                    <Table.HeaderCell>手錶編號</Table.HeaderCell>
                                    <Table.HeaderCell>帳號</Table.HeaderCell>
                                    <Table.HeaderCell>密碼</Table.HeaderCell>
                                    <Table.HeaderCell>userAccessToken</Table.HeaderCell>
                                    <Table.HeaderCell>userAccessTokenSecret</Table.HeaderCell>
                                    <Table.HeaderCell>建檔日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改日期</Table.HeaderCell>
                                    <Table.HeaderCell>修改刪除</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {watch.map((Watch,index)=> {
                                    return(
                                        <Table.Row key={Watch.firebaseid}>
                                            <Table.Cell>{Watch.id}</Table.Cell>
                                            <Table.Cell>{Watch.watchid}</Table.Cell>
                                            <Table.Cell>{Watch.account}</Table.Cell>
                                            <Table.Cell>{Watch.password}</Table.Cell>
                                            <Table.Cell>{Watch.userAccessToken}</Table.Cell>
                                            <Table.Cell>{Watch.userAccessTokenSecret}</Table.Cell>
                                            <Table.Cell>{Watch.createdTime}</Table.Cell>
                                            <Table.Cell>{Watch.editedTime}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={'/editwatch/'+Watch.firebaseid}><Button>修改</Button></Link>
                                                <Button onClick={() => deleteWatch(Watch.firebaseid)}>刪除</Button>
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
export default WatchList;
