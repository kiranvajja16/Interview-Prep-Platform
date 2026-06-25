import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, user } = useAuth()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute