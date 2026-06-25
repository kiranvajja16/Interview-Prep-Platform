import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'

const QuizPage = () => {
  const navigate=useNavigate()
  const {id} = useParams()
  const {token} = useAuth()

  const [quiz, setQuiz] = useState(null)
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const handleAnswerChange = (questionId, answer) => {
  setSelectedAnswers(prev => ({
    ...prev,
    [questionId]: answer,
  }))
  }

  const handleSubmit = async ()=>{
    if(Object.keys(selectedAnswers).length!==quiz.questions.length){
      alert('Please answer all questions')
      return
    }

    try{
      const answers=quiz.questions.map(
        question => selectedAnswers[question._id]
      )

      const response=await api.post('/results/submit',{quizId:quiz._id,answers},
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      )
      console.log(response.data)
      alert('Quiz submitted successfully!')
      navigate('/results')
    }
    catch(err){
      console.log(err)
      alert('Failed to submit quiz')
    }
  }
  useEffect(() => {
    
    const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setQuiz(response.data)
    } catch (err) {
  console.log(err)
  alert('Failed to load quiz')
}
  }
    fetchQuiz()
  },[id,token])

  

  if (!quiz) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h1>{quiz.title}</h1>

      <p>{quiz.description}</p>

      {quiz.questions?.map((question, index) => (
        <div key={question._id}>
          <h3>
            {index + 1}. {question.question}
          </h3>

          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={question._id}
                value={option}
                checked={selectedAnswers[question._id] === option}
                onChange={() => handleAnswerChange(question._id, option)}
              />
                {option}
            </label>
          ))}

          <hr />
        </div>
      ))}
      <button onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  )
}

export default QuizPage