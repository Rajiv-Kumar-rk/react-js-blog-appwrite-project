import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Button, Input, Select, RTE} from "./index";
import bucketServices from "../appwrite/bucketServices";
import postServices from "../appwrite/databaseServices";
import { postSliceActions } from "../store/postSlice";

function PostFormComponent({post}) {
  const {register, handleSubmit, setValue, getValues, watch, control} = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  });

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state)=>state.auth.userData);

  const submit = async (data)=>{
    setLoader(true);

    //update post
    if (post){
      //if image is there in the post form, then first upload the image first
      const file = data.image[0] ? await bucketServices.uploadImageFile(data.image[0]) : null;

      //if image gets upload then delete the previously attached image with the current post
      if (file) {
          bucketServices.deleteImageFile(post.featuredImage);
      }

      //finally, update the current post and the attached image with the current post
      const dbPost = await postServices.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined
      })
      .then((post)=>{
        dispatch(postSliceActions.editPost(post));
        setLoader(false);
        return post;
      })

      //after post update, navigate the user to the post read page
      if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
      }
    }

    //create new post
    else {
      //if image is there in the post form, then first upload the image first
      const file = await bucketServices.uploadImageFile(data.image[0]);

      //if image gets upload then add the new post with the above uploaded image
      if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await postServices.createPost({ ...data, userId: userData.$id })
          .then((post)=>{
            dispatch(postSliceActions.addPost(post));
            setLoader(false);
            return post;
          })
          
          //after post creation and saving the new post to store, navigate the user to the post read page
          if (dbPost) {
            console.log('finally block:', dbPost)
              navigate(`/post/${dbPost.$id}`);
          }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
    {
      loader ?
      <div className="flex flex-wrap">
          <div className="p-2 w-full text-center">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                  Processing request...
              </h1>
          </div>
      </div>
      :
      <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        
        <div className="w-2/3 px-2">
  
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { 
              required: true 
              })
            }
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { 
              required: true 
              })
            }
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  
        </div>
  
        <div className="w-1/3 px-2">
  
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { 
              required: !post 
              })
            }
          />
  
          
          {
            post && (
              <div className="w-full mb-4">
                <img
                  src={bucketServices.getImageFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )
          }
  
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { 
              required: true 
              })
            }
          />
          <Button
            type="submit" 
            bgColor={post ? "bg-green-500" : undefined} 
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
  
        </div>
  
      </form>
      </>
    }
    </>
  )
}

export default PostFormComponent;