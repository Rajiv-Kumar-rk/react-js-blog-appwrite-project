import { useEffect, useState } from "react"
import { PostCard, Container } from "../components/index"
import  postServices from '../appwrite/databaseServices'
import { postSliceActions } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";

function AllPostsPage() {
  const [loader, setLoader] = useState(true);
  const posts = useSelector((state)=> state.posts);
  const dispatch= useDispatch();

  useEffect(()=>{
    if (posts.length === 0) {
      postServices.getPosts([])
      .then((posts)=>{
        if (posts) dispatch(postSliceActions.addPosts(posts.documents));
      })
      .finally(()=>setLoader(false))
    }
    else {
      setLoader(false);
    }
  }, [])


return (
  <div className='w-full py-8 mt-4 text-center'>
    <Container>
      {
        loader? 
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Loading post database ...
                </h1>
            </div>
        </div>
        :
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
      }
    </Container>
  </div>
)
}

export default AllPostsPage;