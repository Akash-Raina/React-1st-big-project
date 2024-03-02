import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from '../../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from "react-router-dom";
import data from '../../assests/bg-img.jpg'
import { MdOutlineTitle, MdDescription } from "react-icons/md";

interface createPostType {
    title : string
    description : string
}


export const CreatForm = () =>{

    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("Your title is required"),
        description: yup.string().required("Description is required")
    })

    const {register, handleSubmit, formState:{errors}} = useForm<createPostType>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");
    const navigate = useNavigate();

    const submitPost = async (data: createPostType)=>{
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        });

        navigate("/")
    }
    return(
        <>
            <div className='w-full h-[32.4rem] flex flex-col justify-center items-center gap-3'>
                <span className='border-b-2 font-logo text-xl text-violet-500 cursor-pointer hover:border-violet-500 hover:transition-transform duration-700 ease-in-out delay-200'>Create Post</span>
                <div className='bg-white rounded-xl w-[75%] h-[75%] grid grid-rows-2 md:grid-flow-col md:grid-cols-2 md:grid-rows-1 '>
                    <div className='row-span-2 h-36 md:h-full bg-white flex justify-center items-center rounded-xl'>
                        <img src={data} className='h-[60%]'/>
                    </div>  
                    <form onSubmit={handleSubmit(submitPost)} className='pt-3 h-72 flex flex-col justify-center items-center bg-white gap-2 pb-5 rounded-xl md:h-full md:p-12'>
                        <div className='w-[80%] bg-slate-400 rounded-xl h-[20%] flex items-center gap-2 md:h-[13%]'>
                            <MdOutlineTitle size={30} className='pl-2'/>
                            <input type="text" placeholder='Title' className='bg-slate-400 placeholder-slate-600 font-logo placeholder:font-logo w-[85%] focus:outline-none' {...register("title")}/>
                        </div>
                        <p className='text-red-500'>{errors.title?.message}</p>
                        <div className='w-[80%] bg-slate-400 rounded-xl h-[60%] flex gap-2 pt-2'>
                            <MdDescription size={30} className='pl-3'/>
                            <textarea placeholder='Description' className='w-[90%] h-[95%] bg-slate-400 font-logo placeholder-slate-600 placeholder:font-logo focus:outline-none'{...register("description")}></textarea>
                        </div>
                        <p className='text-red-500'>{errors.description?.message}</p>
                        <input type='submit' className='w-[80%] bg-violet-500 rounded-xl  h-[20%] font-logo text-white placeholder-slate-600 cursor-pointer hover:bg-violet-600'/>
                    </form>
                </div>
            </div>
        </>
    )
}