import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import './index.css'

const Navbar = () => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h2 className="logo">
        Interview Prep Platform
      </h2>

      <div className="navbar-right">
        <span className="username">
          Welcome, {user?.name}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar