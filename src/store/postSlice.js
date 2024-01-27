import { createSlice } from "@reduxjs/toolkit";

const posts = [];

const postSlice = createSlice({
  name: 'post',
  initialState: posts,
  reducers: {
    addPost: (state, action)=>{
      let prevPosts = [...state];
      // console.log('prev posts:', prevPosts);
      let newPosts = [...prevPosts, action.payload];
      // console.log('new posts:', newPosts);

      return newPosts;
    },

    editPost: (state, action)=>{
      // console.log('edit post:', action.payload);
      // console.log('before edit:', state);
      const postIndex = state.findIndex((post) => post.$id === action.payload.$id);

      if (postIndex !== -1) {
        // If the post is found, update it with the new data
        state[postIndex] = { ...state[postIndex], 
          'title': action.payload.title? action.payload.title : state[postIndex].title,
          'content': action.payload.content? action.payload.content : state[postIndex].content,
          'status': action.payload.status? action.payload.status : state[postIndex].status,
          'featuredImage': action.payload.featuredImage? action.payload.featuredImage : state[postIndex].featuredImage
        };
      }
      // console.log('after edit:', state);
      return state;
    },
    
    deletePost: (state, action)=>{
      return state.filter((post)=>post.$id !== action.$id);
    },

    addPosts: (state, action)=>{
      // console.log('posts to save:', action.payload)
      return action.payload;
    }
  }
})

export const postSliceActions = postSlice.actions;
export default postSlice.reducer;