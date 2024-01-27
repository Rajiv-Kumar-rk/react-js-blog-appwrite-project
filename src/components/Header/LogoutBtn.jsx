import { useNavigate } from "react-router-dom";
import authServices from "../../appwrite/authServices";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    authServices.userLogout()
    .then(()=> {
      dispatch(authSliceActions.logout())
      navigate('/');
    })
    .catch((error)=> {
      console.log(`Error :: LogoutBtn :: user logout failed`, error);
    })
  }

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={()=>handleLogout()}>
      Logout
    </button>
  )
}

export default LogoutBtn;