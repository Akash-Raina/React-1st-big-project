import {Post as IPost} from './Main';

interface Props{
    post: IPost;
}

export const Post = (props : Props) =>{
    const {post} = props;
    return (
        <div>{post.username}</div>
    )
}