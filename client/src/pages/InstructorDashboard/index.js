import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'


const InstructorDashboard = () => {
  const {user, token,logout} = useAuth()
  const navigate=useNavigate()

  const [quizzes,setQuizzes] = useState([])

  useEffect(()=>{
    const fetchQuizzes = async ()=>{
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
  }
    fetchQuizzes()
  },[token])

  

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
        <div key={quiz.id}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <button onClick={()=> navigate(`/edit-quiz/${quiz._id}`)}>
            Edit
          </button>
          <button>
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