import { useAuthState } from 'react-firebase-hooks/auth';
import {Post as IPost} from './Main';
import {db, auth } from '../../config/firebase';
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface Props{
    post: IPost;
}
interface Like{
    userId: string;
    likeId: string;
}

export const Post = (props : Props) =>{
    const {post} = props;
    const [user] = useAuthState(auth);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const [likes, setLikes] = useState<Like[] | null>(null);

    const getlikes = async () =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id })));
    };
    const addLike = async ()=>{
       try{
         const newDoc = await addDoc(likesRef, {
            userId: user?.uid, 
            postId: post.id
        });
         if(user){
            setLikes((prev) => prev ? [...prev, {userId: user.uid, likeId:newDoc.id}] : [{userId: user.uid, likeId:newDoc.id}]);
        }
       } catch (err){
        console.log(err)
       }
    }
    const removeLike = async ()=>{
       try{

        const likeToDeleteQuery = query(likesRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
        );

        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
        if(user){
            setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
        }

       } catch (err){
        console.log(err)
       }
    }
    const userLiked = likes?.find((seeLike => seeLike.userId === user?.uid));
    useEffect(() => {getlikes();}, [])
    return (
        <div className=' flex flex-col items-center mx-10 my-6 border-b-2'>
            <div className=' text-2xl font-logo text-violet-500'>
                @{post.username}
            </div> 
            <div>
                <h1 className='text-xl font-bold text-slate-300'>{post.title}</h1>
            </div>
            <div>
                <p className='text-lg text-white'>{post.description}</p>
            </div>      
            <div className='flex gap-2'>
                <button className='' onClick={userLiked ? removeLike : addLike}>{userLiked ? <><FaHeart size={30}/></> : <><FaRegHeart size={30}/></> }</button>
                {likes && <p className='text-lg font-bold'>{likes?.length}</p>}
            </div>
        </div>

    )
}