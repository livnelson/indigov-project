import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css' // Create a separate stylesheet for styling

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate input
    if (!email || !password) {
      setError('Both email and password are required.')
      return
    }

    // Clear error
    setError('')

    // Mock login logic for demo purposes
    if (email === 'user@example.com' && password === 'password123') {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div>
      <h1 className='heading'>Welcome to Your Portal</h1>
      <div className='login-container'>
        <h2 className='login-heading'>Login</h2>
        <form
          onSubmit={handleSubmit}
          className='login-form'
        >
          {error && <div className='error-message'>{error}</div>}

          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              className='form-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              className='form-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
          </div>

          <button
            type='submit'
            className='btn-primary'
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
