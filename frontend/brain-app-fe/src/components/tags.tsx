interface TagProps{
    title:string,
}
export function Tags(props:TagProps){
    return(
        <div className="bg-lavender-100 text-lavender-500 text-[10px] flex gap-x-1 p-1 rounded-lg">
           <div>#</div> 
           <div>{props.title}</div>
        </div>
    )
}