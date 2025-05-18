import axios from "axios";
import { useRecoilState } from "recoil";
import { DataAtom } from "../stores/atom/Dataatom";
import { LinkAtom } from "../stores/atom/LinkAtom";

export function useFetchShareable() {
  const [data, setData] = useRecoilState(DataAtom);

  // console.log("Inside Sharable");
  const fetchShareable = async () => {
    try {
      const pathSegments = window.location.pathname.split("/");
      const hash = pathSegments[pathSegments.length - 1];

      const response = await axios.get(`http://localhost:5000/My-brain/share/brain/${hash}`);
      setData(response.data.data);
      console.log(localStorage.getItem("link"));
    } catch (error: any) {
      alert(error.response.msg);
    }
  };

  return { fetchShareable };
}
