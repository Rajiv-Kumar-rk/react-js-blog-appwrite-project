import { useEffect } from "react";
import { useState } from "react"
import { PostCard, Container } from "../components/index"
import  postServices from '../appwrite/databaseServices'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSliceActions } from "../store/postSlice";

function HomePage() {
  const [loader, setLoader] = useState(true);
//   const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state)=> state.auth.status);
  const posts = useSelector((state)=>state.posts);

  useEffect(() => {
      postServices.getPosts()
      .then((posts) => {
        if (posts) {
            dispatch(postSliceActions.addPosts(posts.documents));
            // setPosts(posts.documents);
        }
      })
      .finally(()=>setLoader(false))
  }, [])

  //if user status is false in stroe then show login page to user
  if ( authStatus === false ) {
      return (
          <div className="w-full py-8 mt-4 text-center">
              <Container>
                  <div className="flex flex-wrap">
                      <div className="p-2 w-full">
                          <h1 className="text-2xl font-bold hover:text-gray-500">
                              Login to read posts
                          </h1>
                      </div>
                  </div>
              </Container>
          </div>
        
      )
  }

  return (
      <div className='w-full py-8 mt-4 text-center'>
          <Container>
            {
                loader? 
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                           Loading posts...
                        </h1>
                    </div>
                </div>
                :
                (
                    posts.length > 0 ? 
                    <div className='flex flex-wrap'>
                        {  
                            posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard post={post} />
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            Sorry!,  No post in database ...
                            </h1>
                        </div>
                    </div>
                )
            }
              
          </Container>
      </div>
  )
}

export default HomePage;