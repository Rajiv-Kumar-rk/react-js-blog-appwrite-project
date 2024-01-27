import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authServices from './appwrite/authServices.js'; 
import { authSliceActions } from './store/authSlice.js';
import { Outlet } from 'react-router-dom';
import {Header, Footer, Container} from './components/index.js';

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{

    authServices.getCurrentLoggedUser()
    .then((userData)=>{
      //if userDta returned, then svae the user into store
      if(userData) {
        dispatch(authSliceActions.login({userData}))
      }
      //if userData not returned, run logout so that no even any single user stay in store
      else{
        dispatch(authSliceActions.logout());;
      }
    })
    .catch((error)=>{
      console.log(`Error :: App.jsx :: while getting the current logged in user data`, error);
    })
    .finally(()=>setLoader(false))

  }, [])

  return (
    !loader? (
      <div className='min-h-screen flex flex-wrap content-between bg-grey-400'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
    : 
    <div className="w-full py-8 mt-4 text-center">
      <Container>
          <div className="flex flex-wrap">
              <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                      Authenticating...
                  </h1>
              </div>
          </div>
      </Container>
    </div>
  )
}

export default App;
