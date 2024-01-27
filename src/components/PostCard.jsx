import { Link } from "react-router-dom";
import bucketServices from "../appwrite/bucketServices";

function PostCard({ post }) {

  return (
    <Link to={`/post/${post.$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={bucketServices.getImageFilePreview(post.featuredImage)} alt={post.title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{post.title}</h2>
        </div>
    </Link>
  )
}

export default PostCard;