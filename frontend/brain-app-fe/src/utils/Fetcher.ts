import axios from "axios";
import { useRecoilState } from "recoil";
import { DataAtom } from "../stores/atom/Dataatom";

export async function fetcher(token:string,setData: (data: any) => void){
  if (token) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/contents/`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      }
    );

    setData(response.data.data);
  } 
}