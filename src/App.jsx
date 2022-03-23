import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './store/user'



function App() {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(userLogin())
  } , [])

  console.log(user)

  return (
    <div>
      <h1>HorneroApp</h1>
    </div>
  );
}

export default App;
