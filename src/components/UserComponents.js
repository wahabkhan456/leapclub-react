import React, { useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUsers} from '../redux/actions/users' 


const UserComponents = () => {

 
    const dispatch = useDispatch()
   const users = useSelector(state => state.users.users)
    
    

  useEffect(() => {
    dispatch(getUsers([{
      title:"hello world"
    }]))
    
  }, [dispatch])


    return (
        <>
       <div>
          {users.map((item)=>(
              <h1>{item.title}</h1>
          ))}
       </div>
      
        </>
    )
}

export default UserComponents;
