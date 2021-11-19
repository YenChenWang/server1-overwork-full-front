import React, { PureComponent } from 'react';
import Headers from '../Headers.js';
import { Grid, Container, Header } from 'semantic-ui-react';
// 數線圖
import { BarChart, Bar, Cell, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,LabelList, } from 'recharts';

// 11月6日壓力指數
const data = [
  { name: '00:00~01:00', 平均壓力指數: 69 },
  { name: '01:00~02:00', 平均壓力指數: 74 },
  { name: '02:00~03:00', 平均壓力指數: 67 },
  { name: '03:00~04:00', 平均壓力指數: 72 },
  { name: '04:00~05:00', 平均壓力指數: 52 },
  { name: '05:00~06:00', 平均壓力指數: 43 },
  { name: '06:00~07:00', 平均壓力指數: 46 },
  { name: '07:00~08:00', 平均壓力指數: 57 },
  { name: '08:00~09:00', 平均壓力指數: 53 },
  { name: '09:00~10:00', 平均壓力指數: 50 },
  { name: '10:00~11:00', 平均壓力指數: 49 },
  { name: '11:00~12:00', 平均壓力指數: 55 },
  { name: '12:00~13:00', 平均壓力指數: 57 },
  { name: '13:00~14:00', 平均壓力指數: 72 },
  { name: '14:00~15:00', 平均壓力指數: 85 },
  { name: '15:00~16:00', 平均壓力指數: 76 },
  { name: '17:00~18:00', 平均壓力指數: 72 },
  { name: '18:00~19:00', 平均壓力指數: 65 },
  { name: '19:00~20:00', 平均壓力指數: 74 },
  { name: '20:00~21:00', 平均壓力指數: 84 },
  { name: '21:00~22:00', 平均壓力指數: 82 },
  { name: '22:00~23:00', 平均壓力指數: 70 },
  { name: '23:00~24:00', 平均壓力指數: 75 },
];

// 一周平均壓力指數
const data01 = [
  { name: '11月3日', 平均壓力指數: 44 },
  { name: '11月4日', 平均壓力指數: 37 },
  { name: '11月5日', 平均壓力指數: 49 },
  { name: '11月6日', 平均壓力指數: 39 },
  { name: '11月7日', 平均壓力指數: 36 },
  { name: '11月8日', 平均壓力指數: 90 },
  { name: '11月9日', 平均壓力指數: 19 },
];

// 四周平均壓力指數
const data02 = [
  { name: '10月13日', 平均壓力指數: 28 },
  { name: '10月14日', 平均壓力指數: 58 },
  { name: '10月15日', 平均壓力指數: 44 },
  { name: '10月16日', 平均壓力指數: 20 },
  { name: '10月17日', 平均壓力指數: 31 },
  { name: '10月18日', 平均壓力指數: 37 },
  { name: '10月19日', 平均壓力指數: 37 },
  { name: '10月20日', 平均壓力指數: 20 },
  { name: '10月21日', 平均壓力指數: 40 },
  { name: '10月22日', 平均壓力指數: 48 },
  { name: '10月23日', 平均壓力指數: 46 },
  { name: '10月24日', 平均壓力指數: 44 },
  { name: '10月25日', 平均壓力指數: 49 },
  { name: '10月26日', 平均壓力指數: 41 },
  { name: '10月27日', 平均壓力指數: 42 },
  { name: '10月28日', 平均壓力指數: 44 },
  { name: '10月29日', 平均壓力指數: 49 },
  { name: '10月30日', 平均壓力指數: 37 },
  { name: '10月31日', 平均壓力指數: 34 },
  { name: '11月1日', 平均壓力指數: 42 },
  { name: '11月2日', 平均壓力指數: 42 },
  { name: '11月3日', 平均壓力指數: 44 },
  { name: '11月4日', 平均壓力指數: 37 },
  { name: '11月5日', 平均壓力指數: 49 },
  { name: '11月6日', 平均壓力指數: 39 },
  { name: '11月7日', 平均壓力指數: 36 },
  { name: '11月8日', 平均壓力指數: 90 },
  { name: '11月9日', 平均壓力指數: 19 },
];

// 11月7日心跳數
const data03 = [
  { name: '00:00~01:00', 平均心跳數: 74 },
  { name: '01:00~02:00', 平均心跳數: 85 },
  { name: '02:00~03:00', 平均心跳數: 55 },
  { name: '03:00~04:00', 平均心跳數: 54 },
  { name: '04:00~05:00', 平均心跳數: 58 },
  { name: '05:00~06:00', 平均心跳數: 60 },
  { name: '06:00~07:00', 平均心跳數: 56 },
  { name: '07:00~08:00', 平均心跳數: 62 },
  { name: '08:00~09:00', 平均心跳數: 58 },
  { name: '09:00~10:00', 平均心跳數: 91 },
  { name: '10:00~11:00', 平均心跳數: 77 },
  { name: '11:00~12:00', 平均心跳數: 121 },
  { name: '12:00~13:00', 平均心跳數: 107 },
  { name: '13:00~14:00', 平均心跳數: 117 },
  { name: '14:00~15:00', 平均心跳數: 94 },
  { name: '15:00~16:00', 平均心跳數: 91 },
  { name: '17:00~18:00', 平均心跳數: 107 },
  { name: '18:00~19:00', 平均心跳數: 121 },
  { name: '19:00~20:00', 平均心跳數: 99 },
  { name: '20:00~21:00', 平均心跳數: 113 },
  { name: '21:00~22:00', 平均心跳數: 110 },
  { name: '22:00~23:00', 平均心跳數: 106 },
  { name: '23:00~24:00', 平均心跳數: 83 },
];

// 一周心跳數
const data04 = [
  { name: '11月3日', 最高心跳數: 147, 最低心跳數: 57 },
  { name: '11月4日', 最高心跳數: 137, 最低心跳數: 64 },
  { name: '11月5日', 最高心跳數: 146, 最低心跳數: 61 },
  { name: '11月6日', 最高心跳數: 106, 最低心跳數: 62 },
  { name: '11月7日', 最高心跳數: 140, 最低心跳數: 57 },
  { name: '11月8日', 最高心跳數: 126, 最低心跳數: 60 },
  { name: '11月9日', 最高心跳數: 147, 最低心跳數: 62 },
];

// 四周心跳數
const data05 = [
  { name: '10月13日', 最高心跳數: 123, 最低心跳數: 57 },
  { name: '10月14日', 最高心跳數: 122, 最低心跳數: 60 },
  { name: '10月15日', 最高心跳數: 138, 最低心跳數: 55 },
  { name: '10月16日', 最高心跳數: 104, 最低心跳數: 55 },
  { name: '10月17日', 最高心跳數: 132, 最低心跳數: 54 },
  { name: '10月18日', 最高心跳數: 129, 最低心跳數: 56 },
  { name: '10月19日', 最高心跳數: 120, 最低心跳數: 52 },
  { name: '10月20日', 最高心跳數: 111, 最低心跳數: 53 },
  { name: '10月21日', 最高心跳數: 144, 最低心跳數: 59 },
  { name: '10月22日', 最高心跳數: 124, 最低心跳數: 57 },
  { name: '10月23日', 最高心跳數: 138, 最低心跳數: 61 },
  { name: '10月24日', 最高心跳數: 140, 最低心跳數: 54 },
  { name: '10月25日', 最高心跳數: 128, 最低心跳數: 61 },
  { name: '10月26日', 最高心跳數: 110, 最低心跳數: 56 },
  { name: '10月27日', 最高心跳數: 138, 最低心跳數: 57 },
  { name: '10月28日', 最高心跳數: 132, 最低心跳數: 68 },
  { name: '10月29日', 最高心跳數: 123, 最低心跳數: 56 },
  { name: '10月30日', 最高心跳數: 136, 最低心跳數: 63 },
  { name: '10月31日', 最高心跳數: 136, 最低心跳數: 56 },
  { name: '11月1日', 最高心跳數: 123, 最低心跳數: 58 },
  { name: '11月2日', 最高心跳數: 114, 最低心跳數: 56 },
  { name: '11月3日', 最高心跳數: 147, 最低心跳數: 57 },
  { name: '11月4日', 最高心跳數: 137, 最低心跳數: 64 },
  { name: '11月5日', 最高心跳數: 146, 最低心跳數: 61 },
  { name: '11月6日', 最高心跳數: 106, 最低心跳數: 62 },
  { name: '11月7日', 最高心跳數: 140, 最低心跳數: 57 },
  { name: '11月8日', 最高心跳數: 126, 最低心跳數: 60 },
  { name: '11月9日', 最高心跳數: 147, 最低心跳數: 62 },
];

// 一天睡眠狀態
const data06 = [
  { id: '4', sleepType: '清醒', startTime: 1636241040, endTime: 1636241100},
  { id: '4', sleepType: '清醒', startTime: 1636246320, endTime: 1636246380},
  { id: '4', sleepType: '清醒', startTime: 1636250400, endTime: 1636250460},
  { id: '4', sleepType: '清醒', startTime: 1636253460, endTime: 1636253520},
  { id: '4', sleepType: '清醒', startTime: 1636254180, endTime: 1636254600},
  { id: '4', sleepType: '清醒', startTime: 1636256280, endTime: 1636256340},
  { id: '3', sleepType: 'REM', startTime: 1636237140, endTime: 1636240020},
  { id: '3', sleepType: 'REM', startTime: 1636244280, endTime: 1636244340},
  { id: '3', sleepType: 'REM', startTime: 1636246140, endTime: 1636246320},
  { id: '3', sleepType: 'REM', startTime: 1636246380, endTime: 1636247940},
  { id: '3', sleepType: 'REM', startTime: 1636248000, endTime: 1636249020},
  { id: '3', sleepType: 'REM', startTime: 1636249440, endTime: 1636250400},
  { id: '3', sleepType: 'REM', startTime: 1636250460, endTime: 1636250940},
  { id: '3', sleepType: 'REM', startTime: 1636251000, endTime: 1636251780},
  { id: '3', sleepType: 'REM', startTime: 1636255920, endTime: 1636256280},
  { id: '3', sleepType: 'REM', startTime: 1636256340, endTime: 1636256640 },
  { id: '2', sleepType: '淺層', startTime: 1636233180, endTime: 1636234080},
  { id: '2', sleepType: '淺層', startTime: 1636234980, endTime: 1636237140},
  { id: '2', sleepType: '淺層', startTime: 1636240020, endTime: 1636241040},
  { id: '2', sleepType: '淺層', startTime: 1636241100, endTime: 1636244280},
  { id: '2', sleepType: '淺層', startTime: 1636244340, endTime: 1636246140},
  { id: '2', sleepType: '淺層', startTime: 1636247940, endTime: 1636248000},
  { id: '2', sleepType: '淺層', startTime: 1636249020, endTime: 1636249440},
  { id: '2', sleepType: '淺層', startTime: 1636250940, endTime: 1636251000},
  { id: '2', sleepType: '淺層', startTime: 1636251780, endTime: 1636253460},
  { id: '2', sleepType: '淺層', startTime: 1636253520, endTime: 1636254180},
  { id: '2', sleepType: '淺層', startTime: 1636254600, endTime: 1636255920},
  { id: '2', sleepType: '淺層', startTime: 1636256640, endTime: 1636257480},
  { id: '1', sleepType: '深層', startTime: 1636234080, endTime: 1636234980},
];

const sleepData = [];

for (let i = 0; i < data06.length; i++){
  const time = new Date(data06[i].startTime * 1000);
  const h = time.getHours();
  const m = time.getMinutes();
  for (let j = 1; j <= 23; j++){
    if (h >= j && h < j + 1) {
      if (h >= 1 && h < 10) {
        if (m >= 0 && m < 10) {
          data06[i]['hour'] = h;
          data06[i]['min'] = m;
          data06[i]['Time'] = '0' + h + ':0' + m;
        }
        else {
          data06[i]['hour'] = h;
          data06[i]['min'] = m;
          data06[i]['Time'] = '0' + h + ':' + m;
        }
      }
      else if (h >= 10 && h < 23) {
        if (m >= 0 && m < 10) {
          data06[i]['hour'] = h;
          data06[i]['min'] = m;
          data06[i]['Time'] = h + ':0' + m;
        }
        else {
          data06[i]['hour'] = h;
          data06[i]['min'] = m;
          data06[i]['Time'] = h + ':' + m;
        }
      } 
    }
  }
}




// 一周睡眠狀態
const data07 = [
  { name: '11月5日', 深度睡眠: 3360, 淺度睡眠: 17760, 動眼期: 7620 },
  { name: '11月6日', 深度睡眠: 1680, 淺度睡眠: 14040, 動眼期: 1080 },
  { name: '11月7日', 深度睡眠: 0, 淺度睡眠: 29040, 動眼期: 7020 },
  { name: '11月8日', 深度睡眠: 3300, 淺度睡眠: 20700, 動眼期: 1920 },
  { name: '11月9日', 深度睡眠: 1680, 淺度睡眠: 23940, 動眼期: 3060 },
  { name: '11月10日', 深度睡眠: 1260, 淺度睡眠: 17580, 動眼期: 1140 },
  { name: '11月11日', 深度睡眠: 2040, 淺度睡眠: 22560, 動眼期: 4680 },
];



export default class Analyze extends PureComponent {
    render() {
      const h2={
        fontSize: '2rem',
        fontWeight: 'bold',
      }
      const line={
        height: '1px',
        borderTop: 'solid gray 1px',
      }
      return(
        <Grid >
          <Headers/>
          <Grid.Row >
            <Grid.Column>
              <Container>
                <Header style={h2}>數據分析</Header>
                <Container style={line}></Container>
                <div style={{ width: '100%' }}>
                  <Header style={h2}>11月6日壓力指數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="平均壓力指數" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>


                  <Header style={h2}>一周平均壓力指數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data01}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="平均壓力指數" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>


                  <Header style={h2}>四周平均壓力指數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data02}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="平均壓力指數" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>


                  <Header style={h2}>11月7日心跳數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data03}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="平均心跳數" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>


                  <Header style={h2}>一周心跳數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data04}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="最高心跳數" stroke="#8884d8" fill="#8884d8" />
                      <Line connectNulls type="monotone" dataKey="最低心跳數" stroke="#82ca9d" fill="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>


                  <Header style={h2}>四周心跳數</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={data05}
                      margin={{
                        top: 10,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line connectNulls type="monotone" dataKey="最高心跳數" stroke="#8884d8" fill="#8884d8" />
                      <Line connectNulls type="monotone" dataKey="最低心跳數" stroke="#82ca9d" fill="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>

                  <Header style={h2}>一周睡眠狀態（秒）</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      width={500}
                      height={300}
                      data={data07}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="深度睡眠" stackId="a" fill="#8884d8" />
                      <Bar dataKey="淺度睡眠" stackId="b" fill="#82ca9d" />
                      <Bar dataKey="動眼期" stackId="c" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>

                  
                  <Header style={h2}>11月7日睡眠狀態（秒）</Header>
                  <Container style={line}></Container>
                  <ResponsiveContainer width='100%' height={200}>
                    <BarChart
                      width={500}
                      height={300}
                      data={sleepData}
                      margin={{
                        top: 20,
                        right: 5,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="category" dataKey="Time"/>
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="id" fill="#82ca9d" minPointSize={5}>
                        <LabelList dataKey="sleepType" label={{ position: 'top' }}  />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }

