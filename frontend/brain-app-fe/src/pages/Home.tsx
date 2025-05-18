import { Brain } from "lucide-react";
import { Buttons } from '../components/Buttons';
import { useNavigate } from "react-router-dom";

export function Home(){
    const navigate=useNavigate();

    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-5">
            <div className="flex gap-x-2">
                <Brain className='text-lavender-500' size={90} />
                <div className='text-5xl md:text-7xl font-bold'>Second Brain</div>
            </div>
            <div className="flex gap-x-5">
                <Buttons id='Signup' variant='primary' size='md' text={"SignUp"} click={()=>{navigate("/signup")}}/>
                <Buttons id='Signin' variant='secondary' size='md' text={"SignIn"} click={()=>{navigate("/signin")}}/>
            </div>

        </div>
    )
}