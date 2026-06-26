import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import Layout from '../../components/Layout'
import CustomButton from '../../components/CustomButton'
import QuizCard from '../../components/QuizCard'

const CandidateDashboard = () => {
  const {user,token,logout}=useAuth()
  const navigate=useNavigate()

  const [quizzes,setQuizzes]=useState([])

  useEffect(()=>{
    fetchQuizzes()
})

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
    <Layout>
      <h1>Welcome {user.name}</h1>
      <h2>Available Quizzes</h2>
      <div className="quiz-grid">

      {quizzes.map(quiz => (

      <QuizCard
        key={quiz._id}
        quiz={quiz}
        role="candidate"
        onTakeQuiz={id => navigate(`/quiz/${id}`)}
      />
      ))}

</div>
      <br/>
      <CustomButton text='My Results' variant='success' onClick={()=>navigate('/results')}/>

      <br/>
      <br/>
      <CustomButton text="Logout" variant='danger' onClick={handleLogout}/>
    </Layout>
  )

}

export default CandidateDashboard