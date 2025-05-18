import type { ReactElement } from "react"
import { ClipLoader } from 'react-spinners';
import { useLoader } from "../hooks/useLoader";

export interface ButtonProps{
    id:string,
    variant:"primary"|"secondary"|"danger",
    size:"lg"|"md"|"sm",
    text:string,
    startIcon?:ReactElement,
    click:()=>void
    onHover?:()=>void
    
}
export function Buttons(props:ButtonProps){
    const {loading,runWithLoad}=useLoader(props.id);
    const baseStyle="flex gap-x-1 items-center justify-center rounded-sm p-1 box-border cursor-pointer"
    const variantStyle={
        primary:"bg-lavender-100 text-lavender-500",
        secondary:"bg-lavender-500 text-lavender-100",
        danger:"bg-rose-500 text-white"
    }[props.variant]
    const sizeStyle={
        lg:"h-10 w-50",
        md:"h-9 w-40",
        sm:"h-10 w-12"
    }[props.size]
    return (
        <>
            <div className={` ${variantStyle} ${baseStyle} ${sizeStyle}`} onClick={()=>runWithLoad(props.click)} onMouseEnter={props.onHover ? props.onHover : undefined}>
                {loading ? (<ClipLoader color="#000000" loading={loading} size={25} />) : (
                    <>
                        {props.startIcon && <div>{props.startIcon}</div>}
                        <div>{props.text}</div>
                    </>
                )}
                
            </div>
            
        </>
    )
}

