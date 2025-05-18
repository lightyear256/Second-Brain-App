import axios from "axios";
import { useRecoilState } from "recoil";
import { LinkAtom } from "../stores/atom/LinkAtom";
import { ShareAtom } from "../stores/atom/ShareAtom";

export async function shareHandler() {
    const [link, setLink] = useRecoilState(LinkAtom);
    const [isSharing,setIsSharing]=useRecoilState(ShareAtom);
    console.log("insdie share Hnadler"+ isSharing);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/contents/share`,
      { share: isSharing },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    localStorage.setItem("link", response.data.hash);
    console.log(response.data.hash);
    setLink(response.data.hash);
  }