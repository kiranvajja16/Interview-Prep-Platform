import { useCallback, useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import Layout from '../../components/Layout'
import CustomButton from '../../components/CustomButton'
import QuizCard from '../../components/QuizCard'

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
    <Layout>
      <h1>Welcome {user.name}</h1>
      <CustomButton text="Create New Quiz" variant='success'  onClick={()=> navigate('/create-quiz')}/>


      <hr/>
      <div className="quiz-grid">
        {quizzes.map(quiz => (
        <QuizCard
          key={quiz._id}
          quiz={quiz}
          role="instructor"
          onEdit={id => navigate(`/edit-quiz/${id}`)}
          onDelete={handleDelete}
        />
        ))}

      </div>
      <CustomButton text="Logout" variant="danger" onClick={handleLogout}/>
    </Layout>
  )
}

export default InstructorDashboard