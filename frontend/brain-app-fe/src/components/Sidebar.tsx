import { Brain ,Twitter,X, Youtube,FileText,Link2, Hash} from "lucide-react"
import { openSidebarAtom } from "../stores/atom/SidebarOpener";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SideBarButtons } from './sidebarButtons';
export function SideBar(){
    
    const open=useRecoilValue(openSidebarAtom);
    console.log(open);
    const setOpen=useSetRecoilState(openSidebarAtom)
    return(
        
        <div className={` fixed  h-full w-[21rem]  border-r border-b border-gray-700 bg-white transform transition-transform duration-300 ease-in-out  ${open ? "block" : "hidden"} md:static md:block top-0 left-0 z-50 }`}>
                <div className={`flex items-center justify-end mt-5 mr-5  md:hidden`}><X onClick={()=>setOpen(false)}/></div>
            <div className="flex items-center gap-x-5 mt-2 ml-1 cursor-pointer">
                <Brain className="text-lavender-500" size={45}/>
                <div className="text-2xl font-bold">Second Brain</div>
            </div>
            <div className="mt-8 ml-2 flex flex-col justify-center  gap-y-2">
                <SideBarButtons title={"Tweets"} icon={<Twitter/>}/>
                <SideBarButtons title={"Videos"} icon={<Youtube/>}/>
                <SideBarButtons title={"Document"} icon={<FileText />}/>
                <SideBarButtons title={"Links"} icon={<Link2 />}/>
                <SideBarButtons title={"Tags"} icon={<Hash/>}/>
            </div>

        </div>
       
    )
}