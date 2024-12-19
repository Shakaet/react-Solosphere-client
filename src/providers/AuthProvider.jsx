/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(()=>{
    let unsubscribed= onAuthStateChanged(auth, (CurrentUser) => {
  
       setUser(CurrentUser)
      //  console.log("current",CurrentUser?.email)


       if(CurrentUser){
        let user={email:CurrentUser?.email}

        axios.post("http://localhost:9000/jwt",user,{withCredentials:true})
        .then(res=>{
          // console.log("login",res.data)
          setLoading(false)
        })
       }

       else{
        axios.post("http://localhost:9000/logout",{},{withCredentials:true})
        .then(res=>{
          // console.log("logout",res.data)
          setLoading(false)
        })
       }

       
       
       
       
      //  // wait,put in in the correct place
      //  setLoading(false)
      });

      return ()=>{
        unsubscribed()
      }
},[])


  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
