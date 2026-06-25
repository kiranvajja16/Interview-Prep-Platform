import { useCallback, useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'


const InstructorDashboard = () => {
  const {user, token,logout} = useAuth()
  const navigate=useNavigate()

  const [quizzes,setQuizzes] = useState([])

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this quiz?'
    )
    if(!confirmDelete){
      return
    }
    try{
      await api.delete(`/quizzes/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      alert('Quiz deleted successfully')
      fetchQuizzes()
    }
    catch(err){
      console.log(err)
      alert('Failed to delete quiz')
    }
  }
   const fetchQuizzes =useCallback( async ()=>{
    try{
      const response= await api.get('/quizzes',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      setQuizzes(response.data)
    }
    catch(err){
      console.log(err)
    }
  },[token])

  useEffect(()=>{
    fetchQuizzes()
  },[fetchQuizzes])

  

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={()=> navigate('/create-quiz')}>
        Create New Quiz
      </button>

      <hr/>
      {quizzes.map(quiz=>(
        <div key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <button onClick={()=> navigate(`/edit-quiz/${quiz._id}`)}>
            Edit
          </button>
          <button onClick={()=>handleDelete(quiz._id)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default InstructorDashboard