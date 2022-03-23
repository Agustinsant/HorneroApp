import React, { useEffect} from 'react'
import { Route, Routes } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './store/user'
import NavbarComponent from './components/Navbar'
import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';





function App() {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userLogin())
  } , [])

  console.log(user)

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path='/login' element='Login'/>
        <Route path='/register' element='Register'/>
        <Route path='/mi_perfil' element='Mi Perfil'/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
