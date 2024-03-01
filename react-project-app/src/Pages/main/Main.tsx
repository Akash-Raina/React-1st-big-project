import {getDocs, collection} from 'firebase/firestore'
import {db} from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Post } from './Post';

export interface Post{
    username: string;
    description: string;
    id: string;
    userId: string;
    title: string;
}
export const Main = ()=>{

    const [postsList, getPostsList] = useState<Post[] | null >(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () =>{
        const data = await getDocs(postsRef);
        getPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    }
    useEffect(() => {
        getPosts();
    },[])
    return(
        <div>
            {postsList?.map((post) => (<Post post = {post}/>))}
        </div>
    )
}