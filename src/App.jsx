import './App.css'
import { BrowserRouter, Routes, Route , Outlet} from "react-router-dom";

//Link for User Authentication Tutorial
//https://blog.logrocket.com/user-authentication-firebase-react-apps/

import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Account from './pages/Account.jsx';
import Register from './components/Register.jsx';
import Reset from './components/Reset.jsx';
import Dashboard from './components/Dashboard.jsx';
import StudySession from './UI/StudySession/StudySession.jsx';

function App() 
{
  return (
    <div>
      <h1 className="titleContainer">Learning Tongan</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route exact path="/Login" element={<Login/>}/>
            <Route exact path="/Account" element={<Account/>}/>
            <Route exact path="/Register" element={<Register />} />
            <Route path="/Reset" element={<Reset />} />
            <Route exact path="/Dashboard" element={<Dashboard />}>
              <Route path="/Dashboard/StudySession" element={<StudySession />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Outlet/>
    </div>
  );
}

export default App;
