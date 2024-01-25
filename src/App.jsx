import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Account from './pages/Account.jsx';

function App() 
{

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Account" element={<Account/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
