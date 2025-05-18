import { X } from "lucide-react";
import { useRecoilState } from "recoil";
import { openModalAtom } from "../stores/atom/ModalOpen";
import { Input } from "./Input";
import { Dropdown } from "./DropdownInput";
import { Buttons } from "./Buttons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export function CreateContentModal() {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const typeref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useRecoilState(openModalAtom);
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  useEffect(()=>{
    setErrors({})
    setMsg(null)
  },[open])
  async function submiter() {
    console.log("hello");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/contents/create`,
        {
          link: linkref.current?.value,
          title: titleref.current?.value,
          type: typeref.current?.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setMsg(response.data.msg);
      setOpen(false);
    } catch (error: any) {
      const data = error.response?.data;
      console.log(data.msg.fieldErrors);
      if (data?.msg?.fieldErrors) {
        setErrors(data.msg.fieldErrors);
      } else if (typeof data?.msg === "string") {
        setErrors({ general: [data.msg] });
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <>
      {open ? (
        <div className="w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-5 rounded-md">
            <div className="flex justify-end">
              <X
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <div className="font-bold text-2xl  ">Create Brain</div>
              <div>
                <Input
                  title="Link"
                  readonly={false}
                  type="text"
                  placeholder="Link"
                  refer={linkref}
                ></Input>
                {errors.link && (
                  <p className="text-red-500">{errors.link[0]}</p>
                )}
                </div>
                <div>
                <Input
                  title="Title"
                  readonly={false}
                  type="text"
                  placeholder="Title"
                  refer={titleref}
                ></Input>
                {errors.title && (
                  <p className="text-red-500">{errors.title[0]}</p>
                )}
                </div>
                <div>
                <Dropdown
                  placeholder="Type"
                  title="Type"
                  refer={typeref}
                ></Dropdown>
                {errors.type && (
                  <p className="text-red-500">{errors.type[0]}</p>
                )}
                </div>
                <div className="mt-5">
                  {msg && <p className="text-green-400">{msg}</p>}
                  <Buttons
                    id={"submit"}
                    variant="secondary"
                    size="lg"
                    text="submit"
                    click={() => {
                      submiter();
                    }}
                  ></Buttons>
                </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
