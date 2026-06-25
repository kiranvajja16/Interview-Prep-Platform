import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import api from '../../services/api'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('candidate')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      })

      alert('Registration Successful')

      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed')
    }
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <br />
        <br />

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="candidate">
            Candidate
          </option>

          <option value="instructor">
            Instructor
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <Link to="/login">
        Already have an account?
      </Link>
    </div>
  )
}

export default Register