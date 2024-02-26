import { Link } from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
export const Navbar = ()=>{
    const [user] = useAuthState(auth);
    const signUserOut = async () =>{
        await signOut(auth);
    }
    return(
        <>
            <div className="border flex items-center gap-2 justify-between">
                <div className="flex  w-[70%] justify-between px-7">
                    <span>LearnReact</span>
                    <div className="flex gap-4">
                        <Link to={"/"}>Home</Link>
                        {!user ? (<Link to={"/login"}>Login</Link>):
                        (<Link to ={"/createpost"}>Create Post</Link>)}
                    </div>
                    </div>
                    {user && (
                        <div className="border flex items-center w-[30%] gap-4 pl-3">
                            <img src={auth.currentUser?.photoURL || ""} alt="img" className="rounded-[100%] w-10 border-2"/>
                            <h1>{auth.currentUser?.displayName}</h1>
                            <button onClick={signUserOut}>Sign Out</button>
                        </div>
                    )}
                    
            </div>
        </>
    )
}