import { Asterisk } from "lucide-react";
import type { RefObject } from "react";

interface Inputprops{
    title:string,
    type:"text" | "password" | "email" | "number" | "tel" | "url"| "search" | "date" | "datetime-local" | "month" | "week"| "time" | "color" | "checkbox" | "radio" | "range"| "file" | "submit" | "reset" | "button" | "hidden" | "image";
    placeholder:string,
    readonly:boolean
    refer:RefObject<HTMLInputElement|null>
    value?:string
}
export function Input(props:Inputprops){
    return(
        <div className='flex flex-col gap-y-2'>
                <div className=' flex pl-2'>
                    <div>{props.title} </div>
                    <Asterisk className="text-red-500" size={15}/>
                </div>
                <div><input type={props.type} readOnly={props.readonly} value={props.value} placeholder={props.placeholder} className='bg-white w-85 h-10 rounded-xl p-5 border-2 border-slate-400' ref={props.refer}></input></div>
        </div>
    )
}