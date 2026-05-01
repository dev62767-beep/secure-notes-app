import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')
    const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true } 
      )

      console.log(response.data)

      setEmail('')
      setPassword('')
      seterror('')
      navigate('/notes')

    } catch (error) {
      console.error('Error logging in user:', error.response?.data || error.message)
      seterror(error.response?.data?.message || "Login failed");
    }
  }

  
  return (
 <div className='flex flex-col gap-4 items-center justify-center h-[90%] pt-10 w-full'>
      <h1 className='text-4xl font-bold'>Login</h1>

      <form
        className='flex flex-col gap-4 w-full md:w-[50%]'
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder='Email'
          required
          className='p-2 rounded-2xl'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='Password'
          required
          className='p-2 rounded-2xl'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type='submit'
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'

        >
          Login
        </button>
        <button
          type='submit'
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => navigate('/register')}
        >
          Register Now
        </button>
      </form>
    </div>
  )
}

export default Login
