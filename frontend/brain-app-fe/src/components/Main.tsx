import axios from "axios";
import { Card } from "./Card";
interface Data{
  link: string;
  type: "youtube" | "twitter";
  title: string;
  _id:string
}
interface ResourceItem {
  data:Data[]
  readonly:boolean
}

export function Main(props:ResourceItem) {
  
  return (
    <div className="h-full w-full bg-gray-100 box-border p-3">
     {Array.isArray(props.data) && props.data.length > 0 ? <div className="  pb-10 flex flex-wrap gap-5 items-start justify-center xl:justify-start xl:ml-5 ">
        {Array.isArray(props.data)&&props.data.map((item,index)=>(<Card
          key={index}
          link={item.link}
          type={item.type}
          title={item.title}
          id={item._id}
          readonly={props.readonly}
        />))}
        {/* <Card
          link={"https://www.youtube.com/watch?v=pXJ2qoGU88g"}
          type={"youtube"}
          title={"Some Project Idea"}
        /> */}
        
      </div>:<div className="flex justify-center items-center text-5xl text-gray-400 font-bold">NO Content</div>}
    </div>
  );
}
