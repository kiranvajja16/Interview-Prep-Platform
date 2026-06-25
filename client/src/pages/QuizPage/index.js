import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'

const QuizPage = () => {
  const {id} = useParams()
  const {token} = useAuth()

  const [quiz, setQuiz] = useState(null)

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
        <div key={index}>
          <h3>
            {index + 1}. {question.question}
          </h3>

          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
              />
                {option}
            </label>
          ))}

          <hr />
        </div>
      ))}
    </div>
  )
}

export default QuizPage