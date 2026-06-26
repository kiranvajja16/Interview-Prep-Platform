import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import CustomButton from '../../components/CustomButton'
import './index.css'
import {toast} from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const {login} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      login(response.data.user, response.data.token)

      if (response.data.user.role === 'admin') {
        navigate('/admin')
      } else if (response.data.user.role === 'instructor') {
        navigate('/instructor')
      } else {
        navigate('/candidate')
      }
      toast.success('Login Successfull')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login Failed')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          Interview Prep Platform
        </h1>

        <p className="auth-subtitle">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <CustomButton
            text="Login"
            type="submit"
            variant="primary"
          />

        </form>

        <p className="bottom-text">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login