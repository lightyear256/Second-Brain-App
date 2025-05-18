import { Brain } from "lucide-react";
import { Input } from "../components/Input";
import { Buttons } from "../components/Buttons";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import dotenv from 'dotenv';

export function SiginUp() {
  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const nameref = useRef<HTMLInputElement>(null);
  const [msg,setMsg]=useState(null)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
const navigate=useNavigate()
  const handlesubmit = async () => {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;
    const name = nameref.current?.value;
    console.log("Submitting:", { email, password, name });
    try {
      setErrors({});
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          email: email,
          password: password,
          name: name,
        }
      );
      setMsg(response.data.msg);
      setTimeout(()=>{
          setMsg(null)
          navigate("/signin")
      },500)
    } catch (error: any) {
      const data = error.response?.data;
      if (data.msg.fieldErrors) {
        console.log(data.msg.fieldErrors);
        setErrors(data.msg.fieldErrors);
      } else if (typeof data?.msg === "string") {
        setErrors({ general: [data.msg] });
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-y-5 justify-center items-center bg-white ">
      <div className="flex items-center gap-x-3">
        <Brain className="text-lavender-500" size={70} />
        <div className="text-5xl font-bold">Second Brain</div>
      </div>
      <div className="flex flex-col justify-center items-center border-1 gap-y-3 border-gray-400 p-4 rounded-md bg-gray-200 shadow-2xl">
        <div className="font-bold text-2xl">Sign Up</div>
        <div className="flex flex-col gap-y-3">
          <Input
            title={"Email"}
            type="text"
            placeholder="Enter Email ID"
            readonly={false}
            refer={emailref}
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          <Input
            title={"Password"}
            type="password"
            placeholder="Enter Password"
            readonly={false}
            refer={passwordref}
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
          <Input
            title={"Name"}
            type="text"
            placeholder="Enter Name"
            readonly={false}
            refer={nameref}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
        </div>
        {errors.general && <p className="text-red-500">{errors.general[0]}</p>}
        {msg && <p className="text-green-400">{msg}</p>}
        <div className="mt-5">
          <Buttons
            id="sign-up-btn"
            variant="secondary"
            size="lg"
            text={"Submit"}
            click={() => {
              handlesubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}
