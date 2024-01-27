import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components/index"
import postServices from '../appwrite/databaseServices'
import bucketServices from "../appwrite/bucketServices";
import parse from "html-react-parser";

function ReadPostPage() {
  const [loader, setloader] = useState(true);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

//   console.log(`post user: ${post?.userId}`)
//   console.log(`userId: ${userData?.$id}`)

  useEffect(() => {
      if (slug) {
          postServices.getPost(slug)
          .then((post) => {
              if (post) setPost(post);
              else navigate("/");
          })
          .finally(()=>setloader(false))
      } 
      else navigate("/");

  }, [slug, navigate]);

  const deletePost = () => {
      setloader(true);
      postServices.deletePost(post.$id)
      .then((status) => {
          if (status) {
              bucketServices.deleteImageFile(post.featuredImage);
              navigate("/");
          }
      })
      .finally(()=>setloader(false))
  };

  return post ? (
      <div className="w-full py-8 mt-4 ">
          <Container>
            {
                loader?
                <div className="flex flex-wrap justify-center">
                    <div className="p-2 w-full text-center">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Processing request...
                        </h1>
                    </div>
                </div>
                :
                <>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 min-h-10">
                  <img
                      src={bucketServices.getImageFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="rounded-xl"
                  />

                  {
                    isAuthor && (
                      <div className="absolute right-6 top-6">
                          <Link to={`/edit-post/${post.$id}`}>
                              <Button bgColor="bg-green-500" className="mr-3">
                                  Edit
                              </Button>
                          </Link>
                          <Button bgColor="bg-red-500" onClick={deletePost}>
                              Delete
                          </Button>
                      </div>
                    )
                  }

              </div>

              <div className="w-full mb-6">
                  <h1 className="text-2xl font-bold">{post.title}</h1>
              </div>

              <div className="browser-css">
                  {parse(post.content)}
              </div>
              </>
            }
              
          </Container>
      </div>
  ) : null;
}

export default ReadPostPage;