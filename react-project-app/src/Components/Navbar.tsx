import { Link } from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import { IoMdHome, IoMdAddCircle, IoMdLogIn } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

export const Navbar = ()=>{
    const [user] = useAuthState(auth);
    const signUserOut = async () =>{
        await signOut(auth);
    }
    const selectSignInUi = "flex  w-[100%] justify-between  pt-3 md:w-[100%]";
    const selectLogedInUi = "flex  w-[65%] justify-between  pt-3 md:w-[70%]"
    return(
        <>
            <div className=" flex items-center gap-2 justify-between px-7">
                <div className={`${!user ? selectSignInUi : selectLogedInUi}`}>
                    <span className="font-logo font-bold text-white text-2xl">MiniTwitter</span>
                    <div className=" flex gap-8 ">
                        <Link to={"/"}><IoMdHome size={30} color="white"/></Link>
                        {!user ? (<Link to={"/login"} className="font-signIn font-bold text-white rounded-md text-lg bg-lime-500 w-24 text-center hover:bg-green-500 ">SignIn</Link>):
                        (<Link to ={"/createpost"}><IoMdAddCircle size={30} color="white "/></Link>)}
                    </div>
                    </div>
                    {user && (
                        <div className=" flex items-center w-[35%] gap-4 pl-3 pt-3 md:w-[30%] md:justify-evenly">
                            <img src={auth.currentUser?.photoURL || ""} alt="img" className="rounded-[100%] w-10 border-2"/>
                            <span className="font-signIn text-xl text-white">{auth.currentUser?.displayName}</span>
                            <button onClick={signUserOut} className="font-signIn text-[0.7rem] text-white font-bold rounded-lg bg-black h-10 w-20 flex justify-center items-center hover:bg-red-500"><FaSignOutAlt size={20}/></button>
                        </div>
                    )}
                    
            </div>
        </>
    )
}