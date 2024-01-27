import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import  postServices from '../appwrite/databaseServices'
import { Container, PostFormComponent } from  '../components/index'

function EditPostFormPage() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
      if (slug) {
          postServices.getPost(slug).then((post) => {
              if (post) {
                  setPost(post)
              }
          })
      } else {
          navigate('/')
      }
  }, [slug, navigate])

  return post ? (
    <div className='w-full py-8 mt-4'>
        <Container>
            <PostFormComponent post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPostFormPage;