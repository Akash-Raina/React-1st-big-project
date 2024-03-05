import {auth, provider} from "../config/firebase"
import {signInWithPopup } from "firebase/auth"
import {useNavigate} from "react-router-dom"
import { FcGoogle } from "react-icons/fc";

export const Login = ()=>{
    const navigate  = useNavigate();
    const signInWithGoogle = async() =>{
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/");
    }
        
    
    return(
        <div className="h-[33.4rem] flex justify-center items-center bg-violet-400">
            <div className=" flex flex-col justify-center items-center h-[50%] w-[50%] gap-5 bg-violet-300 rounded-md">
                <h1 className="text-xl font-logo text-violet-500">Create an account</h1>
                <button onClick={signInWithGoogle} className="rounded-lg  w-[70%] h-10 flex gap-2 justify-center items-center text-lg font-bold bg-indigo-800 text-white hover:bg-indigo-900"><FcGoogle size={30}/>Sign In with Google</button>
            </div>
        </div>
    )
}