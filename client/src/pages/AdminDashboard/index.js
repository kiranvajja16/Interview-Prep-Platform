import { useEffect,useState } from "react"
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'



const AdminDashboard = () => {
  const {user,token,logout}=useAuth()
  const navigate=useNavigate()

  const [analytics, setAnalytics] = useState({
  totalUsers: 0,
  totalCandidates: 0,
  totalInstructors: 0,
  totalQuizzes: 0,
  totalAttempts: 0,
})

const [users,setUsers]=useState([])

const handlePromote = async id =>{
  try{
    await api.put(`/admin/promote/${id}`,{},{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    alert('User promoted successfully')
    fetchUsers()
    fetchAnalytics()
  }
  catch(err){
    console.log(err)
    alert('Failed to promote user')
  }
}

const handleDeleteUser=async id =>{
  const confirmDelete = window.confirm('Are you sure you want to delete this user?')

  if(!confirmDelete){
    return
  }
  try{
    await api.delete(`/admin/users/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    alert('User deleted successfully')
    fetchUsers()
    fetchAnalytics()
  }
  catch(err){
    console.log(err)
    alert('Failed to delete user')
  }
}

  useEffect(()=>{
    fetchAnalytics()
    fetchUsers()
  },[])

  const fetchAnalytics=async()=>{
    try{
     const response= await api.get('/admin/analytics',{
      headers:{
        Authorization:`Bearer ${token}`,
      },
     })
     setAnalytics(response.data)
    }
    catch(err){
      console.log(err)
      alert('Failed to load analytics')
    }
  }

  const fetchUsers=async () =>{
    try{
      const response=await api.get('/admin/users',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setUsers(response.data)
    }
    catch(err){
      console.log(err)
      alert('Failed to load users')
    }
  }

  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }
  return(
    <div>
      <h1>Welcome {user.name}</h1>
      <h2>Dashboard Analytics</h2>
      <h3>Total Users:{analytics.totalUsers}</h3>
      <h3>Total Quizzes : {analytics.totalQuizzes}</h3>
      <h3>Total Attempts : {analytics.totalAttempts}</h3>
      <br/>
      

      <h2>All Users</h2>

      <table border="1" cellPadding="10">
        <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Promote</th>
        <th>Delete</th>
      </tr>
    </thead>

      <tbody>
        {users.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            {user.role === 'candidate'? (
              <button onClick={()=>handlePromote(user._id)}>
                Promote
              </button>
            ):('-')}
          </td>
          <td><button onClick={()=>handleDeleteUser(user._id)}>
              Delete
            </button></td>
        </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default AdminDashboard