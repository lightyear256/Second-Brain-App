import { Plus, Share2, AlignJustify, LogOut, Check, Hash } from 'lucide-react';
import { Buttons } from "./Buttons";
import { openSidebarAtom } from "../stores/atom/SidebarOpener";
import { useRecoilState, useSetRecoilState } from "recoil";
import { openModalAtom } from "../stores/atom/ModalOpen";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFetchShareable } from "../utils/ShareFetcher";
import { LinkAtom } from "../stores/atom/LinkAtom";
import { DesignerToggle } from "./TogglesWitch";
import { useEffect, useRef, useState } from "react";
import { ShareAtom } from "../stores/atom/ShareAtom";
// import { shareFetcher } from '../../../../backend/src/controller/share';
// import { fetchShareble } from "../utils/ShareFetcher"

export function Navbar() {
  const [isSharing, setIsSharing] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useRecoilState(openSidebarAtom);
  const [link, setLink] = useRecoilState(LinkAtom);
  const setOpenModal = useSetRecoilState(openModalAtom);
  const navigate = useNavigate();

  function onClickHandler(): void {
    setOpenModal(true);
  }
  function LogoutHandler(): void {
    sessionStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowBox(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowBox(false);
      setCopied(false); // reset copied state too
    }, 1000);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dummyLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide "Copied" after 2s
    } catch (err) {
      console.error("Copy failed", err);
    }
    
  };

  async function checker(){
       const response= await axios.get(`${import.meta.env.VITE_API_URL}/user/checker`,
    
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
    checker2()
    setIsSharing(response.data.share)
    }

  async function checker2(){
     const response= await axios.get(`${import.meta.env.VITE_API_URL}/user/linker`,
    
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    )
    localStorage.setItem("link",response.data.hash)
    console.log(localStorage.getItem("link")+" ehbijergjoebjrobg");
  }
  
  useEffect(()=>{
    checker();
  },[])
  const dummyLink = `${
    window.location.origin
  }/My-brain/Share/${localStorage.getItem("link")}`;

  return (
    <div className="flex justify-between p-5 w-full h-50 items-center bg-gray-100 flex-col lg:flex-row gap-y-5">
      <AlignJustify
        className={`${open ? "hidden" : "block"} ml-5 md:hidden`}
        onClick={() => {
          setOpen(true);
        }}
      />
      <div className="text-2xl font-bold font-sans ml-5">All Notes</div>
      <div className="flex gap-x-2 mr-5">
        <div
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Buttons
            id="btn1"
            variant="primary"
            size="md"
            text="Share Brain"
            startIcon={<Share2 />}
            click={() => {}}
            onHover={()=>{checker()}}
          />

          {showBox && (
            <div
              className={`
            absolute top-14 left-0 w-72 bg-white p-5 rounded-md shadow-xl
            transition-all duration-300 ease-out z-50
            animate-fade-in
          `}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-700 text-sm font-medium">
                  {isSharing ? "Share On" : "Share Off"}
                </span>
                <DesignerToggle enabled={isSharing} setEnabled={setIsSharing} />
              </div>

              {isSharing && (
                <div className="w-full mt-2">
                  <label className="block text-xs text-gray-500 mb-1">
                    Shareable Link:
                  </label>
                  <div
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs truncate cursor-pointer flex justify-between items-center"
                    onClick={handleCopy}
                  >
                    <span className="truncate">{dummyLink}</span>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500 ml-2" />
                    ) : null}
                  </div>
                  {copied && (
                    <div className="text-xs text-green-500 mt-1 animate-pulse">
                      Copied to clipboard!
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <Buttons
          id={"btn2"}
          variant="secondary"
          size="md"
          text="Add Create"
          startIcon={<Plus />}
          click={onClickHandler}
        />
        <Buttons
          id={"btn3"}
          variant="danger"
          size="md"
          text="Log-Out"
          startIcon={<LogOut />}
          click={LogoutHandler}
        />
      </div>
    </div>
  );
}
