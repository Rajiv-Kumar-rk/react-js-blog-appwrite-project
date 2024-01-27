import { useEffect, useState } from "react";
import { authSliceActions } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "./index";

function ProtectedLayout({ children, authentication=true}) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const authStatus = useSelector((state)=> state.auth.status);

  useEffect(()=>{

    if(authentication && authStatus !== authentication){
      navigate('/login');
    }
    else if(!authentication && authStatus !== authentication) {
      navigate('/')
    }

    setLoader(false);

  }, [authStatus, navigate, authentication])

  return (
    <>
    {
      loader? 
      <div className='min-h-10 w-full py-8 mt-4 text-center '>
        <Container>
          <div className="flex flex-wrap">
              <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                      Loading page...
                  </h1>
              </div>
          </div>
        </Container>
      </div>
      : 
      <>{children}</>
    }
    </>
  )
}

export default ProtectedLayout;