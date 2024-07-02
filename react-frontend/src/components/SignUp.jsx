import React, { useState } from 'react'
import google from '../assets/Images/google.png'
import github from '../assets/Images/github.png'
import { Link } from 'react-router-dom'

const signUpWithEmail = () => {}
const logInWithGoogle = () => {}
const logInWithGithub = () => {}

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      console.log(`Cookie "${name}" Value:`, cookieValue); // Debugging line
      return cookieValue;
    }

    const signUpWithEmail = (e) => {
      try {
        setIsLoading(true)
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Fetch the CSRF token from the cookies
        fetch('http://127.0.0.1:8000/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          },
          body: JSON.stringify({
            username: email,
            password1: password,
            password2: password,
          })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false))
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 h-screen w-screen">
        <div className="w-full flex justify-center items-center h-screen">
            <div className="bg-gray-600/30 flex flex-col p-12 rounded-md ">
                <h1 className="text-gray-300 flex font-medium w-full justify-center items-center text-3xl font-urbanist pb-8 tracking-wide">Sign up</h1>

                <div className="flex gap-4 pb-4">
                  <button onClick={logInWithGoogle} className="bg-gray-500/60 rounded-md py-3 text-sm text-gray-100 font-medium px-8 text flex flex-row items-center gap-2 outline outline-gray-500 ">
                    <img alt="google" src={google} width={25} height={25} /> 
                    Sign in with Google
                  </button>
                  <button onClick={logInWithGithub} className="bg-gray-500/60 rounded-md py-3 text-sm text-gray-100 font-medium px-8 flex flex-row items-center gap-2 outline outline-gray-500 ">
                  <img alt="github" src={github} width={30} height={30} /> 
                    Sign in with Github
                  </button>
                </div>

                <div className="grid grid-cols-5 items-center mt-4 mb-6 ">
                  <div className="col-span-2 text-gray-600 bg-gray-600"> <hr className="bg-gray-600 border border-gray-700" /></div>
                  <h2 className="flex justify-center text-gray-700 text-xl font-semibold">OR</h2>
                  <div className="col-span-2 text-gray-600 bg-rgray-600"><hr className="border bg-gray-600 border-gray-700" /></div>
                </div>

                <form className="flex flex-col" 
                    onSubmit={signUpWithEmail}
                >
                <div>

                </div>
                

                <label name="email" htmlFor='email' className="text-gray-400 text-lg pb-1 font-medium">Email</label>
                  <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 pl-5 mb-5 mt-1 rounded-md bg-gray-500/60 outline outline-gray-500 active:bg-gray-500/70 text-gray-300 active:ring active:ring-blue-600 active:hover-none"
                    placeholder='Email'
                  />

                  <label name="password" htmlFor='password' className="text-gray-400 text-lg pb-1 font-medium">Password</label>
                  <input 
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 pl-5 mb-4 mt-1 rounded-md w-full bg-gray-500/60 outline outline-gray-500 active:bg-gray-500/70 text-gray-300 active:ring active:ring-blue-600 active:hover-none "
                    placeholder='Password'
                  />
                </form>

                <button onClick={signUpWithEmail} className="mt-5 bg-gradient-to-r from-blue-500 via-pink-500 to-pink-300 rounded-md py-3 text-lg text-gray-100 font-medium ">Sign up</button>

                <p className="mt-6 mb-4 w-full justify-center text-gray-400 items-center flex">Don't have an account?<Link href="/login"><span className="underline underline-offset-4 decoration-gray-200 ml-1 text-blue-500">Register here.</span></Link> </p>
            </div>
        </div>
    </div>
  )
}

export default SignUp