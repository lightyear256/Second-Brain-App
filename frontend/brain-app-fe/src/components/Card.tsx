import {
  Share2,
  Trash2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Tags } from "./tags";
import { useEffect } from "react";
import axios from "axios";
import { fetcher } from "../utils/Fetcher";
import { useRecoilSnapshot, useRecoilState } from "recoil";
import { DataAtom } from "../stores/atom/Dataatom";
interface Post {
  title: string;
  type: "youtube" | "twitter";
  link: string;
  key:number;
  id:string
  readonly:boolean,
}
export function Card(props: Post) {
  const[data,setData]=useRecoilState(DataAtom)
  const Icon = {
    youtube: <Youtube />,
    twitter: <Twitter />,
  }[props.type];

  useEffect(() => {
    if (props.type === "twitter") {
      // Check if twitter widgets script is already loaded
      if (!(window as any).twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      } else {
        // If script already loaded, just re-parse widgets (important for dynamic content)
        (window as any).twttr.widgets.load();
      }
    }
  }, [props.type, props.link]);

  async function deleteHandler(id:string){
      try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/contents/delete`, {
          data: {
            _id: id
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        const token = localStorage.getItem("token");
        if(token){
          fetcher(token, setData);
        }
      }catch(e){
        alert("something went wrong")
      }
  }
  

  return (
    <div className="w-72 flex flex-col gap-y-5 p-5 box-border border-1 border-slate-300 bg-white shadow-md rounded-md relative">
      <div className="flex justify-between items-center border-b-1 border-slate-300 pb-2 ">
        <div className="flex gap-x-4 items-center">
          {Icon}
          <div className="text-md font-bold">{props.title}</div>
        </div>
        {!props.readonly&&<div className="flex gap-x-2 items-center text-gray-500">
          <Share2 strokeWidth={1.5} size={20} onClick={()=>{}} className="cursor-pointer" />
          <Trash2 strokeWidth={1.5} size={20} onClick={()=>{deleteHandler(props.id)}} className="cursor-pointer" />
        </div>}
      </div>
      <div>
        {props.type === "youtube" ? (
          <iframe
            className="w-full aspect-video"
            src={props.link.replace("watch","embed").replace("?v=","/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com","twitter.com")}></a>
          </blockquote>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Tags title="Productivity"/>
        <Tags title="Productivity"/>
        <Tags title="Productivity"/>
        <Tags title="Productivity"/>
      </div>
      <div className="text-gray-500">
        Added on 25-12-25
      </div>
    </div>
  );
}
