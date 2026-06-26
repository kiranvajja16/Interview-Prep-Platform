import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import CustomButton from '../../components/CustomButton'
import './index.css'
import {toast} from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      })

      toast.success('Registration Successful!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration Failed')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          Interview Prep Platform
        </h1>

        <p className="auth-subtitle">
          Create Your Account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <CustomButton
            text="Register"
            type="submit"
            variant="success"
          />

        </form>

        <p className="bottom-text">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register