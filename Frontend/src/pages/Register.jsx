import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        { username, email, password },
        { withCredentials: true } 
      )

      console.log(response.data)

      // clear AFTER success
      setUsername('')
      setEmail('')
      setPassword('')

      navigate('/')

    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message)
    }
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[90%] pt-10 w-full'>
      <h1 className='text-4xl font-bold'>Register</h1>

      <form
        className='flex flex-col gap-4 w-full md:w-[50%]'
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder='Username'
          required
          className='p-2 rounded-2xl'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button
          type='submit'
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register