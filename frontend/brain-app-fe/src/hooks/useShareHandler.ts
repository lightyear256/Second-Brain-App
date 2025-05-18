import { useRecoilState } from "recoil";
import { LinkAtom } from "../stores/atom/LinkAtom";
import { ShareAtom } from "../stores/atom/ShareAtom";
import axios from "axios";
import { useCallback } from "react";

export function useShareHandler() {
  const [link, setLink] = useRecoilState(LinkAtom);
  const [isSharing] = useRecoilState(ShareAtom);

  const handleShare = useCallback(async () => {
    console.log("Inside Handle share "+localStorage.getItem("share"));
    try {
      console.log("inside shareHandler:", isSharing);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/contents/share`,
        { share: localStorage.getItem("share")==='true' },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      localStorage.setItem("link", response.data.hash);
      setLink(response.data.hash);
    } catch (err) {
      console.error("Error in useShareHandler:", err);
    }
  }, [isSharing, setLink]);

  return handleShare;
}
