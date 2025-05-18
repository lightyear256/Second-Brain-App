import type { ReactElement } from "react"

interface SidebarButtonProps{
    icon:ReactElement,
    title:string
}
export function SideBarButtons(props:SidebarButtonProps){
    return(
        <div className="flex gap-x-5 items-center w-80 rounded-md h-5 p-5 box-border cursor-pointer text-xl font-sans hover:bg-gray-200">
            <div>{props.icon}</div>
            <div>{props.title}</div>
        </div>
    )
}