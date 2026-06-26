import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Layout from '../../components/Layout'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'
import Loader from '../../components/Loader'

import './index.css'

const QuizPage = () => {
  const navigate = useNavigate()

  const {id} = useParams()

  const {token} = useAuth()

  const [quiz, setQuiz] = useState(null)

  const [loading, setLoading] = useState(true)

  const [selectedAnswers, setSelectedAnswers] = useState({})

  // --------------------------
  // Fetch Quiz
  // --------------------------

  useEffect(() => {
    fetchQuiz()
  }, [id, token])

  const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setQuiz(response.data)

      setLoading(false)
    } catch (err) {
      console.log(err)

      toast.error('Failed to load quiz.')

      navigate('/candidate')
    }
  }

  // --------------------------
  // Handle Answer Selection
  // --------------------------

  const handleAnswerChange = (
    questionId,
    answer
  ) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // --------------------------
  // Submit Quiz
  // --------------------------

  const handleSubmit = async () => {
    if (
      Object.keys(selectedAnswers).length !==
      quiz.questions.length
    ) {
      toast.info(
        'Please answer all questions.'
      )

      return
    }

    try {
      const answers = quiz.questions.map(
        question =>
          selectedAnswers[question._id]
      )

      await api.post(
        '/results/submit',
        {
          quizId: quiz._id,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(
        'Quiz submitted successfully.'
      )

      navigate('/results')
    } catch (err) {
      console.log(err)

      toast.error(
        err.response?.data?.message ||
          'Failed to submit quiz.'
      )
    }
  }

  // --------------------------
  // Loading
  // --------------------------

  if (loading) {
    return (
      <Layout>

        <Loader />

      </Layout>
    )
  }

    const progress =
    (Object.keys(selectedAnswers).length /
      quiz.questions.length) *
    100

  return (
    <Layout>
      <div className="quiz-container">

        {/* Quiz Header */}

        <div className="quiz-header">

          <h1>{quiz.title}</h1>

          <p>{quiz.description}</p>

          <div className="quiz-info">

            <span>
              Questions : {quiz.questions.length}
            </span>

            <span>
              Answered :
              {Object.keys(selectedAnswers).length}
            </span>

          </div>

          {/* Progress Bar */}

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Questions */}

        {quiz.questions.map((question, index) => (
          <div
            key={question._id}
            className="question-card"
          >

            <h2>
              Question {index + 1}
            </h2>

            <p className="question-text">
              {question.question}
            </p>

            <div className="options-container">

              {question.options.map(option => (
                <label
                  key={option}
                  className={`option-card ${
                    selectedAnswers[
                      question._id
                    ] === option
                      ? 'selected'
                      : ''
                  }`}
                >

                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={
                      selectedAnswers[
                        question._id
                      ] === option
                    }
                    onChange={() =>
                      handleAnswerChange(
                        question._id,
                        option
                      )
                    }
                  />

                  <span>{option}</span>

                </label>
              ))}

            </div>

          </div>
        ))}

        {/* Submit */}

        <div className="submit-section">

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>

        </div>

      </div>
    </Layout>
  )
}

export default QuizPage