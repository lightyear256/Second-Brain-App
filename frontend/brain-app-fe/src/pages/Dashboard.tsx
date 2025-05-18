import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar";
import { Main } from "../components/Main";
import { CreateContentModal } from "../components/CreatecontentModal";
import { Divide } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { openModalAtom } from "../stores/atom/ModalOpen";
import { fetcher } from "../utils/Fetcher";
import { DataAtom } from "../stores/atom/Dataatom";
export function Dasboard() {
    const open = useRecoilValue(openModalAtom);
    console.log(open);
    const [data,setData]=useRecoilState(DataAtom);
  const token = localStorage.getItem("token");
  token != undefined ? console.log("token:" + token) : console.log("undefined");
  
// useEffect(()=>{
//     fetcher();
// },[open])
useEffect(()=>{
    if(token){
    fetcher(token,setData);
    }
},[open])



  return (
    <>
      {token ? (
        <div className="flex h-screen relative">
          <CreateContentModal />
          <SideBar />
          <div className="flex gap-y-10 flex-1 overflow-auto flex-col bg-gray-100 ">
            <Navbar />
            <Main  data={data} readonly={false}/>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center text-3xl">
          404 PAGE NOT FOUND
        </div>
      )}
    </>
  );
}
