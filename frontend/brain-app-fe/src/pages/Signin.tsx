import { Brain } from 'lucide-react';
import { Input } from '../components/Input';
import { Buttons } from '../components/Buttons';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Signin() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailrefsignin = useRef<HTMLInputElement>(null);
  const passwordrefsigin = useRef<HTMLInputElement>(null);

  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"; 

    if (isLoggedIn && localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  const handlesubmit = async () => {
    const email = emailrefsignin.current?.value;
    const password = passwordrefsigin.current?.value;
    try {
      setErrors({});
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        { email, password }
      );
      setMsg(response.data.msg);
      localStorage.setItem('token', response.data.token);
      sessionStorage.setItem("isLoggedIn", "true");

      setTimeout(() => {
        setMsg(null);
        navigate("/dashboard", { replace: true });
      }, 500);
    } catch (error: any) {
      const data = error.response?.data;
      if (data?.msg?.fieldErrors) {
        setErrors(data.msg.fieldErrors);
      } else if (typeof data?.msg === "string") {
        setErrors({ general: [data.msg] });
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className='h-screen w-screen flex flex-col gap-y-5 justify-center items-center bg-white'>
      <div className='flex items-center gap-x-3'>
        <Brain className='text-lavender-500' size={70} />
        <div className='text-5xl font-bold'>Second Brain</div>
      </div>
      <div className="flex flex-col justify-center items-center border-1 gap-y-3 border-gray-400 p-4 rounded-md bg-gray-200 shadow-2xl">
        <div className='font-bold text-2xl'>Sign In</div>
        <div className='flex flex-col gap-y-3'>
          <Input title="Email" type="text" placeholder="Enter Email ID" readonly={false} refer={emailrefsignin} />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          <Input title="Password" type="password" placeholder="Enter Password" readonly={false} refer={passwordrefsigin} />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>
        {msg && <p className="text-green-400">{msg}</p>}
        <div className='mt-5'>
          <Buttons id='sigin-in-btn' variant='secondary' size='lg' text="Submit" click={handlesubmit} />
        </div>
      </div>
    </div>
  );
}
