import {useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'

import AnalyticsSection from './components/AnalyticsSection'
import UsersTable from './components/UsersTable'

import './index.css'

const AdminDashboard = () => {
  const {token} = useAuth()

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalInstructors: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
  })

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchAnalytics()
    fetchUsers()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/analytics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setAnalytics(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePromote = async id => {
    try {
      await api.put(
        `/admin/promote/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      fetchUsers()
      fetchAnalytics()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteUser = async id => {
    const confirmDelete = window.confirm(
      'Delete this user?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchUsers()
      fetchAnalytics()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>

      <div className="admin-dashboard">

        <div className="dashboard-header">

          <h1>Admin Dashboard</h1>

          <p>
            Manage users and monitor platform statistics.
          </p>

        </div>

        <AnalyticsSection analytics={analytics} />

        <UsersTable
          users={users}
          onPromote={handlePromote}
          onDelete={handleDeleteUser}
        />

      </div>

    </Layout>
  )
}

export default AdminDashboard