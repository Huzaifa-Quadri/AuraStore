import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Protected = ({children, role}) => {
  const {user, loading} = useSelector(state => state.auth);

  if(loading) {
		return <h1>Loading...</h1>
	}

  if(!user){
    return <Navigate to="/login"></Navigate>
  }

  if(!user.role){
    return <Navigate to="/select-role"></Navigate>
  }

  if(user.role !== role){
    if(user.role === "buyer"){
      return <Navigate to="/"></Navigate>
    }
    return <Navigate to="/seller/dashboard"></Navigate>
  }
  
  return children;
}

export default Protected;
