import {NavLink} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import './index.css'

const Sidebar = () => {
  const {user} = useAuth()

  return (
    <div className="sidebar">

      {user.role === 'candidate' && (
        <>
          <NavLink to="/candidate">Dashboard</NavLink>

          <NavLink to="/results">
            Results
          </NavLink>
        </>
      )}

      {user.role === 'instructor' && (
        <>
          <NavLink to="/instructor">
            Dashboard
          </NavLink>

          <NavLink to="/create-quiz">
            Create Quiz
          </NavLink>
        </>
      )}

      {user.role === 'admin' && (
        <>
          <NavLink to="/admin">
            Dashboard
          </NavLink>
        </>
      )}

    </div>
  )
}

export default Sidebar