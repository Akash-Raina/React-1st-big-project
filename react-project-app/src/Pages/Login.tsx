import {auth, provider} from "../config/firebase"
import {signInWithPopup } from "firebase/auth"
import {useNavigate} from "react-router-dom"

export const Login = ()=>{
    const navigate  = useNavigate();
    const signInWithGoogle = async() =>{
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/");
    }
        
    
    return(
        <>
            <h1>Sign In with google with continue</h1>
            <button onClick={signInWithGoogle} className="rounded-sm bg-white">Sign In with Google</button>
        </>
    )
}