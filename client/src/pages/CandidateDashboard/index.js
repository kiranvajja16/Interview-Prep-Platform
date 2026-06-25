import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'



const CandidateDashboard = () => {
  const {user,token,logout}=useAuth()
  const navigate=useNavigate()

  const [quizzes,setQuizzes]=useState([])

  useEffect(()=>{
    fetchQuizzes()
  },[])

  const fetchQuizzes=async ()=>{
    try{
      const response=await api.get('/quizzes',{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      setQuizzes(response.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <h2>Available Quizzes</h2>
      {quizzes.map(quiz=>(
        <div key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <button onClick={()=>navigate(`/quiz/${quiz._id}`)}>
            Take Quiz
          </button>
        </div>
      ))}
      <br/>
      <button onClick={()=>navigate('/results')}>
        My Results
      </button>
      <br/>
      <br/>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )

}

export default CandidateDashboard