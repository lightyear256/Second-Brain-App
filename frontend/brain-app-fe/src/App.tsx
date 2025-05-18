import { SiginUp } from './pages/SignUp';
import { Signin } from './pages/Signin';
import { Dasboard } from "./pages/Dashboard";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from "./pages/Home";
import { useEffect } from 'react';
import { Sharble } from './pages/Sharable';
import { useRecoilValue } from 'recoil';
import { LinkAtom } from './stores/atom/LinkAtom';

function App() {
  const link=useRecoilValue(LinkAtom);
  useEffect(()=>{
    console.log("hello");
  },[localStorage.getItem("token")])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path={`/My-brain/Share/:link`} element={<Sharble/>}></Route>
      <Route path="/signup" element={<SiginUp/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dasboard/>}></Route>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
