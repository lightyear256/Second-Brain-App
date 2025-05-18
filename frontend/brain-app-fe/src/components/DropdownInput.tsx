import { ChevronDown } from "lucide-react"
import { useRecoilState } from "recoil"
import { openDropDownAtom } from "../stores/atom/DropDownAtom"
import { useRef, useState } from "react";
import type { RefObject } from "react";
import { Input } from "./Input";

interface InpProps{
    placeholder:string,
    title:string
    refer:RefObject<HTMLInputElement|null>
}
export function Dropdown(props:InpProps){
    const [open,setopen]=useRecoilState(openDropDownAtom);
    const [type,setType]=useState("");
    return(
        <div className="flex flex-col gap-y-2">
        <div className="relative" onClick={()=>{setopen(!open)}} >
            <Input title='Type' readonly={true} value={type} type='text' placeholder='Title' refer={props.refer}></Input>
            <ChevronDown className="absolute top-10 right-2 cursor-pointer"/>
            {open&&<div className="flex flex-col gap-y-2 bg-white p-3 absolute w-full rounded-md">
                <div className="hover:bg-gray-200 p-1 pl-5 rounded-md cursor-pointer" onClick={()=>{setType("youtube")}}>Youtube</div>
                <div className="hover:bg-gray-200 p-1 pl-5 rounded-md cursor-pointer" onClick={()=>{setType("twitter")}}>Twitter</div>
            </div>}
        </div>
        </div>
    )
}