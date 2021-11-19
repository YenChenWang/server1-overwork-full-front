import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signin from "./pages/Signin.js";
// 月更新資料
import MonthList from "./pages/MonthList.js";
import AddMonth from "./pages/AddMonth.js";
import EditMonth from "./pages/EditMonth.js";
// 基本資料
import PersonalList from './pages/PersonalList.js';
import AddPersonal from './pages/AddPersonal.js';
import EditPersonal from './pages/EditPersonal.js';
// 
import MenuTest from './pages/MenuTest.js';
import AddTest from './pages/AddTest.js';
// 手錶資料
import WatchList from './pages/WatchList.js';
import AddWatch from "./pages/AddWatch.js";
import EditWatch from "./pages/EditWatch.js";
// 數據分析
import Analyze from './pages/Analyze.js';
import AnalyzeHeartRate from './pages/Analyze_HeartRate.js';
import AnalyzeSleep from './pages/Analyze_Sleep.js';
import AnalyzeStress from './pages/Analyze_Stress.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path='/menutest' exact>
          <MenuTest/>
        </Route> */}
        {/* <Route path='/addtest/:id' component={AddTest} exact></Route> */}
        
        {/* 登入 */}
        <Route path='/' exact>
          <Signin/>
        </Route>
        {/* 月更新資料 */}
        <Route path='/month' exact>
          <MonthList/>
        </Route>
        <Route path='/addmonth' exact>
          <AddMonth/>
        </Route>
        <Route exact path='/editmonth/:firebaseid' component={EditMonth} ></Route>
        {/* 基本資料 */}
        <Route path='/personal' exact>
          <PersonalList/>
        </Route>
        <Route path='/addpersonal' exact>
          <AddPersonal/>
        </Route>
        <Route path='/editpersonal/:firebaseid' component={EditPersonal} exact></Route>
        {/* 數據分析 */}
        <Route path ='/analyze' exact>
          <Analyze/>
        </Route>
        {/* 心率指數 */}
        <Route path='/analyze/heartrate' exact>
          <AnalyzeHeartRate />
        </Route>
        {/* 睡眠狀態 */}
        <Route path='/analyze/sleep' exact>
          <AnalyzeSleep />
        </Route>
        {/* 壓力指數 */}
        <Route path='/analyze/stress' exact>
          <AnalyzeStress />
        </Route>
        {/* 手錶資料 */}
        <Route path='/watch' exact>
          <WatchList/>
        </Route>
        <Route path='/addwatch' exact>
          <AddWatch/>
        </Route>
        <Route path='/editwatch/:firebaseid' component={EditWatch} exact></Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
