import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from '../../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from "react-router-dom";

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
        <form onSubmit={handleSubmit(submitPost)}>
            <input type="text" placeholder='...title' {...register("title")}/>
            <p className='text-red-500'>{errors.title?.message}</p>
            <textarea placeholder='...description' {...register("description")}></textarea>
            <p className='text-red-500'>{errors.description?.message}</p>
            <input type='submit'/>
        </form>
    )
}